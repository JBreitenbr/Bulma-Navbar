  
let artists=["Al Di Meola","Allman Brothers Band","Archie Shepp","Kajagoogoo","New Order","Depeche Mode","Gary Numan","Arlo Guthrie","Aphrodite's Child","Banco Del Mutuo Soccorso","Van Der Graaf Generator",
"Bill Frisell","Bob Dylan","Anouar Brahem","Buffalo Springfield","Camel","CAN","Chick Corea","Climax Blues Band","Claude Debussy","Elliot Smith","Eric Clapton","Embryo","Eric Dolphy","Fleetwood Mac","Focus","Franco Battiato","Free","Frank Zappa","Genesis","Golden Earring","Grateful Dead","Grobschnitt","Hank Mobley","Herbie Hancock","Horace Silver","Howlin' Wolf","Igor Stravinsky","Il Balletto di Bronzo","Jack DeJohnette","Jackson Browne","Cream","Creedence Clearwater Revival","Deep Purple","Curved Air",
             "Crosby, Stills, Nash & Young","Dream Theater","Duke Ellington","J.J.Cale","Gianna Nannini","Jethro Tull","Jimi Hendrix","Jimmy Smith","John Coltrane","John Lennon","John Mayall","Judas Priest","King Crimson","Koenjihyakkei","Kraan","La coscienza di Zeno","Le Orme","Led Zeppelin","Leo Kottke","Lee Morgan","Leon Russell","Lucio Battisti","Magma","Mahavishnu Orchestra","Maurice Ravel","Myrath","Orphaned Land","Ozric Tentacles","P.J. Harvey", "Paul Simon","Pearl Jam","Peter Green","Philip Glass","Pink Floyd","Porcupine Tree","Renaissance","Radiohead","XTC","Rainbow","Riverside","Rush","Soft Machine","Steely Dan","Steve Reich","Steven Wilson","Sun Ra","Renaissance","TOOL","Talking Heads","Ten Years After","Terry Riley","Beatles","Rolling Stones","Byrds","Doors","Kinks","Pretty Things","The Who","Yardbirds","Thelonious Monk","Rabih Abou-Khalil","Toufic Farroukh","Vangelis","Vanilla Fudge","Tom Waits","Ultimate Spinach","Victor Jara","Wayne Shorter","Yusef Lateef","ZZ Top","Zucchero","Traffic"
];

let arr=["Kajagoogoo","Yes","Franco Battiato","Van Der Graaf Generator","Premiata Forneria Marconi","King Crimson","The Dandy Warhols","Depeche Mode","New Order","Banco Del Mutuo Soccorso","Ultravox","Dissidenten"];
for(let i=0;i<36;i++){
  let rnd=Math.floor(Math.random()*artists.length);
if(!arr.includes(artists[rnd])){arr.push(artists[rnd]);}
}
let arr2=arr.map((item)=>[item,15]);
  // Target the canvas element
  const canvas = document.getElementById('my-word-cloud');

  // Render the word cloud
  WordCloud(canvas, {
    list: arr2,
    gridSize: 10,       // Size of the grid in pixels
    weightFactor: 1,    // Muliplier for word sizes
    fontFamily: 'Arial, sans-serif',
    color: 'random-dark', // Color scheme
    backgroundColor: '#f4f4f4',
    rotateRatio: 0.5,   // Probability a word will rotate (0 to 1)
    rotationSteps: 2,
  });
