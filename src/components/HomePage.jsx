import React from 'react'
import Header from './Header'
import Slider2 from './Slider2'
import ProductionHouse from './ProductionHouse'
import GenreMovieList from './GenreMovieList'
import { Link } from 'react-router-dom'


const HomePage = () => {
  return (
    <>
    <Header/>

    <Slider2/>

    <ProductionHouse/>

    <GenreMovieList/>
</>
  )
}

export default HomePage