import React from 'react'
import Header from '../components/Header';

//Import Components
import IntroContent from '../components/IntroContent'

//CSS Styling
import '../styles/pages.css';

export default function Intro() {
  return (
    <div>
       <Header />
   
    <div className='intro'>
           
     <IntroContent/>
    </div>
     </div>
  )
}
