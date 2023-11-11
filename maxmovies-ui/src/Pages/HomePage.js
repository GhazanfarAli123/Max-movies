import React, { useState } from 'react'
import Navbar from '../Components/navbar.js'

const HomePage = () => {

  // const handelContextMenu =(e) =>{
  //   e.preventDefault()
  // }

  // document.addEventListener("contextmenu",handelContextMenu)
  // return()=>{
  //   document.removeEventListener("contextmenu",handelContextMenu)
  // }
  const [search, setSearch] = useState('')

  const searchBtn = async (e) => {
    e.preventDefault()
    const url = `/search/${search}`;
    console.log(url)
    window.open(url, '_self')
  }
  return (
    <>
      <Navbar />
      <body >
      <div id='qq' className='search'><button type="button" class="btn btn-danger">MAX</button><button type="button" class="btn btn-light">MOVIES</button>
      
        <div id='wa' className='row'>
          <div className='col-3'></div>
          <div id='wq' className='col-6'>
            <form class="form-inline my-2 my-lg-0">
              <input  class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button class="btn btn-outline-danger my-2 my-sm-0" onClick={searchBtn} type="submit">Search</button>
            </form>
          </div>
          <div className='col-3'></div>
        </div>
      </div>
      <h1 id='p'>Max Movies| Watch FREE Movies Online & TV shows</h1>
      <h3 id='o'>About Maxmovies</h3>
      <p id='i'>Yesmovies enable you to find and explore your preferred films and television shows without any hassle. You may easily locate all the information about any movie or tv show like IMDB score, actors, opinions and study its synopsis. This free film app provides you with advanced seek to discover something you need.</p>
      <p id='i'>Yesmovies enable you to find and explore your preferred films and television shows without any hassle. You may easily locate all the information about any movie or tv show like IMDB score, actors, opinions and study its synopsis. This free film app provides you with advanced seek to discover something you need.</p>
      <h3 id='o'>Why use Max movies?</h3>
      <p id='i'>YesMovies is an internet site this is permitting to flow of all of the first-rate English films and television series free in HD satisfactory. Users can discover first-class movies and tv series according to the style and international locations.</p>
      <p id='i'>It's miles permitting the users to watch films online with a single click effortlessly. You should open the site and click on the desired movie to start it, after which you need to click on the play button to start the live stream of the film. You could exchange the exceptional of the film from the professional or the sidebar.YesMovies is an internet site, and it allows flowing movies without an account. Still, you could also generate an account on their site to inquire about a movie on call.</p>
      <h3 id='o'>Features of yesmovie app</h3>
      <h5 id='o'>Clean to apprehend:</h5>
      <p id='i'>Yes, to an outstanding degree, the film App is simple to use as an easy-to-apprehend application interface. It is very clear, no-hassle with subscriptions and payments; you need to start the App, find the television display or movie, and watch it at the cross. You can watch this each time everywhere like at the same time as you're driving, journey, and on uninteresting weekends.</p>
      <h5 id='o'>Various genres:</h5>
      <p id='i'>With greater than 25 kinds or classes of television suggests, you'll experience big problems manipulating yourself from viewing on every occasion you open sure films apk. This App has something for all age organizations and mindsets. It assures for the exceptional ever fun time when you have this in your phone.</p>
      <h5 id='o'>The huge form of filters:</h5>
      <p id='i'>you could effortlessly clear out you seek in keeping with your non-public preferences. With various options to choose from, its miles confirmed which you would get the kind of movies or television suggests you had been trying to find. Furthermore, you may have the right of entry to pick out the content you need to watch, tv shows or films or all. Along these traces, you may additionally pick out genres with your tastes and desire. You may pick out the content in step with USA and online with the year of release to decrease your seek time.</p>
      <h5 id='o'>Get entry to Multinational content material:</h5>
      <p id='i'>you can discover content from all over the world in yes movies App that you could play at once from your cellular. You could get the right of entry to all of the worldwide content material within the HD quality without cost.</p>
      <h1 id='o'>Frequently Asked Question (Maxmovies)</h1>
      <h5 id='o'>Is Mavmovies safe for streaming?</h5>
      <p id='i'>It's far completely complete of popup ads that do it hazardous and non-official. It uses movies which gives it more favorable for the users. Popup advertisements can lead to an extreme malware assault which could spoil the security of your machine and may result in loss of all statistics saved. But in this App, you don't face any trouble.</p>
      <h5 id='o'>Is there any possibility of getting a virus in this App?</h5>
      <p id='i'>Yes, with the aid of streaming unfastened movies on the net, you could get a plague attack. Such websites like Yesmovies are not using commercials, particularly popup advertisements, as their income source, resulting in malware or an exclusive viral attack. By using this attack, your statistics can be misplaced, and your device protection may damage. The hackers may even ask for money to provide your critical information back to you. In this App, you don't get such type of damage.
</p>
      <h5 id='o'>Is Maxmovies illegal?</h5>
      <p id='i'>No, Maxmovies is not illegal since it does not store or host any files. It maybe illegal depending on different jurisdiction and if its illegal in your country, then please do not use yesmovies</p>
      <h1 id='o'>Conclusion</h1>
      <p id='i'>Yesmovies is an internet site that permits users to observe first-class movies and tv indicates online free of price. Users can discover the preferred films and tv indicates in great high-quality with no costs. Movies may observe using the usage of the types online with international locations or keeping with the style of the film. After finding the movie, you may effortlessly play it with a single click. Forwarding off the advertisements, you could use an adblocker extension on your internet browser. Movies may be downloaded from websites online by using an internet download manager.
</p>
        <footer id='e' class="container">
            <p class="float-end"><a href="#">Back to top</a></p>
            <p>© 2017–2021 Company, Inc. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
          </footer>





       </body>
    </>
   
  )
}

export default HomePage
