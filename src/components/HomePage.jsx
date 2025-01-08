import React from 'react'
import Header from './Header'
import Slider from './Slider'
import ProductionHouse from './ProductionHouse'
import GenreMovieList from './GenreMovieList'
import { Link } from 'react-router-dom'


const HomePage = () => {
  return (
    <>
    <Header/>

    <Slider/>

    <ProductionHouse/>

    <GenreMovieList/>
</>
  )
}

export default HomePage