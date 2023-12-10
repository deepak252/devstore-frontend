import GridView from '../../components/GridView'
// import AppHorizontalTile from '../../components/Tiles/AppHorizontalTile'
import { AppTileMemo } from '../../components/Tiles/AppTile'
import styles from './index.module.scss'
const Apps = () => {
  const appList = [
    {
      name: 'Whatsapp',
      imgUrl: 'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s128-rw',
      category: 'Social',
      rating: '4.2',
    },
    {
      name: 'Instagram',
      imgUrl: 'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s128-rw',
      category: 'Social',
      rating: '4.2',
    },
    {
      name: 'Phonepe',
      imgUrl: 'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s128-rw',
      category:'Payment',
      rating: '4.2',
    },
    {
      name: 'Paytm',
      imgUrl: 'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s128-rw',
      category:'Payment',
      rating: '4.2',
    },
    {
      name: 'Google',
      imgUrl: 'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s128-rw',
      category:'Payment',
      rating: '4.2',
    }
  ]
  return (
    <div className={styles.appsContainer}>
      {/* {
        appList.map(appInfo=><AppHorizontalTile key={appInfo.name} {...appInfo}/>)
      } */}
      <GridView 
        heading={'Top Apps'}
        items={appList.map(appInfo=><AppTileMemo key={appInfo.name} {...appInfo}/>)}
        itemsClass={styles.appsContainer__gridItems}
      />
      {/* {
        appList.map(appInfo=><AppVerticalTile key={appInfo.name} {...appInfo}/>)
      } */}
    </div>
  )
}

export default Apps