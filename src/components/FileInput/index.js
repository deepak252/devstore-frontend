import React, { useRef, useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Toast from '../Toast'
import {ReactComponent as FileUploadIcon} from '../../assets/icons/FileUpload.svg'
import { getFileExtension } from '../../utils/fileUtil'
import { TOAST_INITIAL_DATA, TOAST_TYPE } from '../../constants'
import styles from './index.module.scss'

function FileInput({
  hintText,
  hintIcon,
  hintDescription,
  onSelectFiles,
  enableDragAndDrop,
  onDragEnter,
  onDragLeave,
  allowedFileTypes,
  maxFileSizeKB,
  errorMessageMaxFileSize,
  errorMessageInvalidFileType,
  children,
  isMultiple,
  disabled,
  className,
  targetClassName
}) {
  const fileInputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [toastData, setToastData] = useState(TOAST_INITIAL_DATA)

  const handleTargetClick = () => {
    if (disabled) {
      return
    }
    fileInputRef?.current?.click()
  }

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleFileChange = (e) => {
    if (disabled) {
      return
    }
    handleSelectedFiles(e.target.files)
    clearFileInput()
  }

  const handleDragAndDrop = (e, callback) => {
    if (!enableDragAndDrop || disabled) {
      return
    }
    e.preventDefault()
    callback && callback()
  }

  const handleDragEnter = (e) => {
    handleDragAndDrop(e, () => {
      onDragEnter && onDragEnter()
    })
  }

  const handleDragOver = (e) => {
    handleDragAndDrop(e, () => {
      setDragging(true)
    })
  }

  const handleDragLeave = (e) => {
    handleDragAndDrop(e, () => {
      setDragging(false)
      onDragLeave && onDragLeave()
    })
  }

  const handleDrop = (e) => {
    handleDragAndDrop(e, () => {
      setDragging(false)
      handleSelectedFiles(e.dataTransfer.files)
    })
  }

  const handleSelectedFiles = (files) => {
    let selectedFiles = Array.from(files)
    if (allowedFileTypes && allowedFileTypes.length) {
      let isInvalidFileType = false
      selectedFiles = selectedFiles.filter((file) => {
        const ext = `.${getFileExtension(file.name)}`
        if (!allowedFileTypes.includes(ext)) {
          isInvalidFileType = true
        }
        return allowedFileTypes.includes(ext)
      })
      isInvalidFileType &&
        errorMessageInvalidFileType &&
        setToastData({
          message: errorMessageInvalidFileType,
          type: TOAST_TYPE.ERROR
        })
    }
    if (maxFileSizeKB && !isNaN(maxFileSizeKB)) {
      let isMaxSizeFile = false
      selectedFiles = selectedFiles.filter((file) => {
        if (file.size > 1024 * maxFileSizeKB) {
          isMaxSizeFile = true
        }
        return file.size <= 1024 * maxFileSizeKB
      })
      isMaxSizeFile &&
        errorMessageMaxFileSize &&
        setToastData({
          message: errorMessageMaxFileSize,
          type: TOAST_TYPE.ERROR
        })
    }
    if (!isMultiple && selectedFiles.length > 1) {
      selectedFiles = selectedFiles.slice(0, 1)
    }
    onSelectFiles && selectedFiles?.length && onSelectFiles(selectedFiles)
  }

  const targetClassNames = classNames('c-pointer', styles.target,targetClassName, {
    [styles.target__dragEnter]: dragging,
    [styles.target__disabled]: disabled
  })

  return (
    <>
      <div
        className={classNames(styles.container, className)}
        onDragEnter={enableDragAndDrop ? handleDragEnter : null}
        onDragOver={enableDragAndDrop ? handleDragOver : null}
        onDragLeave={enableDragAndDrop ? handleDragLeave : null}
        onDrop={enableDragAndDrop ? handleDrop : null}
      >
        <input
          className="d-none"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple={isMultiple}
          accept={allowedFileTypes.join(',')}
        />
        <div onClick={handleTargetClick}>
          {children || (
            <div className={targetClassNames}>
              {hintIcon || <FileUploadIcon className='size-36'/>}
              <p className={styles.target__hintText}>{hintText}</p>
              <p className={styles.target__hintDescription}>{hintDescription}</p>
            </div>
          )}
        </div>
      </div>
      {toastData?.message?.length && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setToastData(TOAST_INITIAL_DATA)}
        />
      )}
    </>
  )
}

FileInput.propTypes = {
  hintText: PropTypes.string,
  hintIcon: PropTypes.any,
  hintDescription: PropTypes.string,
  onSelectFiles: PropTypes.func,
  enableDragAndDrop: PropTypes.bool,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  allowedFileTypes: PropTypes.arrayOf(PropTypes.string),
  maxFileSizeKB: PropTypes.number,
  errorMessageMaxFileSize: PropTypes.string,
  errorMessageInvalidFileType: PropTypes.string,
  children: PropTypes.node,
  isMultiple: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  targetClassName: PropTypes.string,
}

FileInput.defaultProps = {
  hintText: 'Drag & drop files here or click to select files',
  errorMessageMaxFileSize: 'File size exceeds the maximum limit',
  errorMessageInvalidFileType: 'Invalid file type',
  enableDragAndDrop: true,
  isMultiple: true,
  disabled: false,
  allowedFileTypes: []
}

export default FileInput
