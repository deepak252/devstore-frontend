import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Modal from '../../../components/Modal';
import FileInput from '../../../components/FileInput';
import IconButton from '../../../components/Buttons/IconButton';
import FlatButton from '../../../components/Buttons/FlatButton';
import OutlinedButton from '../../../components/Buttons/OutlinedButton';
import SizedBox from '../../../components/SizedBox';
import Dropdown from '../../../components/Dropdown';
import TextInput from '../../../components/TextInput';
import CheckboxInput from '../../../components/CheckboxInput';
import Switch from '../../../components/Switch';
import AttachmentAppTile from './AttachmentAppTile';
import FormInputWrapper from '../../../components/FormInputWrapper';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import Attachment from '../../../components/Attachment';
import AppInfo from './AppInfo';
import { ReactComponent as MinimizeIcon } from '../../../assets/icons/Minimize.svg';
import { ReactComponent as AddImageIcon } from '../../../assets/icons/AddImage.svg';
import { ReactComponent as AddVideoIcon } from '../../../assets/icons/AddVideo.svg';
import {
  setCreateAppFormData,
  toggleCreateAppFormMinimize,
  toggleCreateAppFormOpen,
  uploadApp,
  uploadAppCancelled,
  setToast,
  createApp,
  createAppCancelled,
} from '../appsSlice';
import useFormValidator from '../../../hooks/useFormValidator';
import { generateOptions } from '../../../utils';
import { appFormValidator } from '../util';
import { getFileSizeKb } from '../../../utils/fileUtil';
import {
  ATTACHMENT_TYPE,
  FILE_EXTENSIONS,
  PLATFORM,
  TOAST_TYPE,
} from '../../../constants';
import styles from './index.module.scss';

const MAX_IMAGES = 8;

const CreateAppForm = () => {
  const dispatch = useDispatch();
  const appCategories = useSelector(
    (state) => state.metadata?.data?.appCategories
  );
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const formData = useSelector((state) => state.apps?.createAppForm?.formData);
  const uploadedAppInfo = useSelector(
    (state) => state.apps?.uploadApp?.appInfo
  );
  const { error, validateField, validateForm, clearFormError } =
    useFormValidator(appFormValidator);
  const platform = formData?.platform;
  const isIOS = platform === PLATFORM.iOS;

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
  };

  const setFormData = (data) => {
    dispatch(setCreateAppFormData(data));
  };

  const handleMinimizeModal = () => {
    dispatch(toggleCreateAppFormMinimize());
  };
  const handleCloseModal = () => {
    dispatch(toggleCreateAppFormOpen());
    dispatch(uploadAppCancelled()); // if uploading app file
    dispatch(createAppCancelled()); // if creating app
    clearFormError();
  };

  const handleSelectFiles = (field, files) => {
    if (field === 'attachmentApp') {
      handleInputChange(field, files[0]);
      const formData = new FormData();
      formData.append('attachmentApp', files[0]);
      formData.append('platform', platform);
      dispatch(uploadApp(formData));
    } else if (field === 'attachmentImages') {
      let updatedFiles = [...formData?.[field]];
      files.forEach((file) => {
        let filePresent = updatedFiles.find((e) => e.name === file.name);
        if (!filePresent) {
          updatedFiles.push(file);
        }
      });
      updatedFiles = updatedFiles.slice(0, MAX_IMAGES);
      handleInputChange(field, updatedFiles);
    } else {
      //attachmentIcon, attachmentVideo
      handleInputChange(field, files[0]);
    }
  };

  const handleRemoveFile = (field, file) => {
    if (field === 'attachmentApp') {
      handleInputChange(field, null);
      dispatch(uploadAppCancelled());
    } else if (field === 'attachmentImages') {
      let updatedFiles = formData?.[field]?.filter((e) => e.name !== file.name);
      handleInputChange(field, updatedFiles);
    } else {
      //attachmentIcon, attachmentVideo
      handleInputChange(field, null);
    }
  };

  const handleCreateClick = () => {
    const errors = validateForm(formData);
    if (errors?.length) {
      return;
    }
    if (!uploadedAppInfo) {
      dispatch(
        setToast({
          type: TOAST_TYPE.ERROR,
          message: 'Application upload failed. Please try again.',
        })
      );
      return;
    }
    const fd = new FormData();
    const {
      name,
      description,
      categories,
      sourceCode,
      isSourceCodePublic,
      isPrivate,
      platform,
      attachmentIcon,
      attachmentImages,
      attachmentVideo,
      attachmentGraphic,
    } = formData ?? {};
    const data = {
      name,
      description,
      categories,
      sourceCode,
      isSourceCodePublic,
      isPrivate,
      platform,
      uploadedAppId: uploadedAppInfo?._id,
    };
    fd.append('data', JSON.stringify(data));
    attachmentIcon && fd.append('attachmentIcon', attachmentIcon);
    attachmentImages?.forEach((imageFile) => {
      fd.append('attachmentImages', imageFile);
    });
    attachmentVideo && fd.append('attachmentVideo', attachmentVideo);
    attachmentGraphic && fd.append('attachmentGraphic', attachmentGraphic);
    dispatch(createApp(fd));
  };

  return (
    <>
      <Modal
        isOpen={true}
        header={
          <div className={styles.modal__header}>
            <h3>Create App</h3>
            <IconButton
              icon={<MinimizeIcon style={{}} className={'size-28'} />}
              onClick={handleMinimizeModal}
            />
          </div>
        }
        footer={
          <div className={styles.modal__footer}>
            <OutlinedButton
              text={'Cancel'}
              onClick={() => {
                setIsConfirmationDialogOpen(true);
              }}
            />
            <SizedBox width='12px' />
            <FlatButton text={'Create'} onClick={handleCreateClick} />
          </div>
        }
        onClose={() => {
          setIsConfirmationDialogOpen(true);
        }}
        showCloseButton={true}
        className={styles.modal}
      >
        <div className={styles.modal__content}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CheckboxInput
              title={'Public'}
              // subtitle={'This application is visible to anyone on the internet.'}
              name={'isPrivate'}
              checked={!formData.isPrivate}
              onChange={(checked) => handleInputChange('isPrivate', !checked)}
              wrapperClass={'mt-8'}
            />
            <div className={styles.modal__content__switch}>
              <Switch
                active={isIOS}
                disabled={formData.attachmentApp ? true : false}
                onChange={(val) =>
                  handleInputChange(
                    'platform',
                    val ? PLATFORM.iOS : PLATFORM.Android
                  )
                }
              />
              <span>IOS</span>
            </div>
          </div>
          <FormInputWrapper
            title={`Upload ${isIOS ? 'IPA' : 'APK'} File*`}
            error={error.attachmentApp}
          >
            <FileInput
              hintDescription={`(Only  ${
                isIOS ? '.ipa' : '.apk'
              } file allowed | Maximum file size: 20MB)`}
              onSelectFiles={(files) =>
                handleSelectFiles('attachmentApp', files)
              }
              allowedFileTypes={isIOS ? ['.ipa'] : ['.apk']}
              maxFileSizeKB={20480}
              isMultiple={false}
              disabled={formData.attachmentApp ? true : false}
            />
          </FormInputWrapper>

          {formData.attachmentApp && (
            <AttachmentAppTile
              attachmentFile={formData.attachmentApp}
              className={styles.attachmentApp}
              onRemove={() => {
                handleRemoveFile('attachmentApp', formData.attachmentApp);
              }}
            />
          )}

          {uploadedAppInfo && (
            <AppInfo
              info={uploadedAppInfo}
              className={styles.uploadedAppInfo}
            />
          )}

          <TextInput
            title={'App Name*'}
            placeholder={'Enter app name'}
            name={'name'}
            value={formData?.name}
            onChange={({ target: { name, value } }) =>
              handleInputChange(name, value)
            }
            error={error?.name}
          />
          <TextInput
            multiline={true}
            title={'Description'}
            placeholder={'Enter app description'}
            name={'description'}
            value={formData?.description}
            onChange={({ target: { name, value } }) =>
              handleInputChange(name, value)
            }
            // error={error?.description}
          />

          <FormInputWrapper
            title={`Categories (${formData?.categories?.length ?? 0}/5)`}
          >
            <Dropdown
              options={generateOptions(appCategories)}
              selectedOptions={generateOptions(formData?.categories) ?? []}
              isMultiSelect={true}
              selectionLimit={5}
              onChange={(options) => {
                options = options.map((e) => e.value);
                handleInputChange('categories', options);
              }}
              wrapperClass={styles.modal__content__dropdownWrapper}
              contentClass={styles.modal__content__dropdownOptions}
            />
          </FormInputWrapper>

          <TextInput
            title={'Source Code URL'}
            placeholder={'Enter source code url (Github/Gitlab)'}
            name={'sourceCode'}
            value={formData?.sourceCode}
            onChange={({ target: { name, value } }) =>
              handleInputChange(name, value)
            }
            error={error?.sourceCode}
          />
          <CheckboxInput
            title={'Public Source Code'}
            name={'isSourceCodePublic'}
            checked={formData?.isSourceCodePublic}
            onChange={(checked) =>
              handleInputChange('isSourceCodePublic', checked)
            }
            wrapperClass={'mt-8'}
          />

          <FormInputWrapper title='Add App Icon*' error={error.attachmentIcon}>
            <FileInput
              hintText={'Drag & drop or click to select file'}
              hintDescription={`(Only ${FILE_EXTENSIONS.IMAGE.join(
                '/'
              )} files allowed | Maximum file size: 1MB)`}
              hintIcon={<AddImageIcon className='size-32' />}
              onSelectFiles={(files) =>
                handleSelectFiles('attachmentIcon', files)
              }
              allowedFileTypes={FILE_EXTENSIONS.IMAGE}
              maxFileSizeKB={1024}
              disabled={formData.attachmentIcon ? true : false}
            />
          </FormInputWrapper>
          {formData?.attachmentIcon && (
            <Attachment
              title={formData?.attachmentIcon.name}
              subtitle={`${getFileSizeKb(formData.attachmentIcon.size)} KB`}
              type={ATTACHMENT_TYPE.IMAGE}
              onClose={() =>
                handleRemoveFile('attachmentIcon', formData.attachmentIcon)
              }
            />
          )}
          <FormInputWrapper
            title={`Add Screenshots/Images (${
              formData?.attachmentImages?.length ?? 0
            }/${MAX_IMAGES})*`}
            error={error.attachmentImages}
          >
            <FileInput
              hintText={'Drag & drop or click to select file'}
              hintDescription={`(Only ${FILE_EXTENSIONS.IMAGE.join(
                '/'
              )} files allowed | Maximum file size: 1MB)`}
              hintIcon={<AddImageIcon className='size-32' />}
              onSelectFiles={(files) =>
                handleSelectFiles('attachmentImages', files)
              }
              allowedFileTypes={FILE_EXTENSIONS.IMAGE}
              maxFileSizeKB={1024}
              disabled={(formData?.attachmentImages ?? []).length >= 8}
            />
          </FormInputWrapper>
          {formData?.attachmentImages?.map((attch) => (
            <Attachment
              key={attch.name}
              title={attch.name}
              subtitle={`${getFileSizeKb(attch.size)} KB`}
              type={ATTACHMENT_TYPE.IMAGE}
              onClose={() => handleRemoveFile('attachmentImages', attch)}
            />
          ))}
          <FormInputWrapper title='Add Feature Graphic'>
            <FileInput
              hintText={'Drag & drop or click to select file'}
              hintDescription={`(Only ${FILE_EXTENSIONS.IMAGE.join(
                '/'
              )} files allowed | Maximum file size: 2MB)`}
              hintIcon={<AddImageIcon className='size-32' />}
              onSelectFiles={(files) =>
                handleSelectFiles('attachmentGraphic', files)
              }
              allowedFileTypes={FILE_EXTENSIONS.IMAGE}
              maxFileSizeKB={2048}
              disabled={formData.attachmentGraphic ? true : false}
            />
          </FormInputWrapper>
          {formData?.attachmentGraphic && (
            <Attachment
              title={formData?.attachmentGraphic.name}
              subtitle={`${getFileSizeKb(formData.attachmentGraphic.size)} KB`}
              type={ATTACHMENT_TYPE.IMAGE}
              onClose={() =>
                handleRemoveFile(
                  'attachmentGraphic',
                  formData.attachmentGraphic
                )
              }
            />
          )}
          <FormInputWrapper title='Add Video'>
            <FileInput
              hintText={'Drag & drop or click to select file'}
              hintDescription={`(Only ${FILE_EXTENSIONS.VIDEO.join(
                '/'
              )} files allowed | Maximum file size: 10MB)`}
              hintIcon={<AddVideoIcon className='size-32' />}
              onSelectFiles={(files) =>
                handleSelectFiles('attachmentVideo', files)
              }
              allowedFileTypes={FILE_EXTENSIONS.VIDEO}
              maxFileSizeKB={1024}
              disabled={formData.attachmentVideo ? true : false}
            />
          </FormInputWrapper>
          {formData?.attachmentVideo && (
            <Attachment
              title={formData?.attachmentVideo.name}
              subtitle={`${getFileSizeKb(formData.attachmentVideo.size)} KB`}
              type={ATTACHMENT_TYPE.IMAGE}
              onClose={() =>
                handleRemoveFile('attachmentVideo', formData.attachmentVideo)
              }
            />
          )}
        </div>
      </Modal>

      {isConfirmationDialogOpen && (
        <ConfirmationDialog
          isOpen={true}
          title={'Discard Changes?'}
          body={'Your changes will be lost. Close anyway?'}
          onCancel={() => {
            setIsConfirmationDialogOpen(false);
          }}
          onConfirm={() => {
            setIsConfirmationDialogOpen(false);
            handleCloseModal();
          }}
        />
      )}
    </>
  );
};

export default CreateAppForm;
