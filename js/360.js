var vrView;
var scenes={
  aft_deck:{
    image:'/img/360/aft_deck.jpg',
    hotspots:{
      main_deck:{
        pitch:0,
        yaw:0,
        radius:0.05,
        distance:1
      }
    }
  },
  main_deck:{
    image:'/img/360/main_deck.jpg',
    hotspots:{
      aft_deck:{
        pitch:0,
        yaw:0,
        radius:0.05,
        distance:1
      }
    }
  },
  whaleRight:{
    image:'whale-right.jpg',
    hotspots:{
      dolphins:{
        pitch:0,
        yaw:305,
        radius:0.05,
        distance:1
      },
      whaleLeft:{
        pitch:0,
        yaw:180,
        radius:0.05,
        distance:1
      },
      walrus:{
        pitch:0,
        yaw:210,
        radius:0.05,
        distance:1
      }
    }
  },
  walrus:{
    image:'/img/360/livingroom.jpg',
    hotspots:{
      whaleLeft:{
        pitch:0,
        yaw:20,
        radius:0.05,
        distance:1
      },
      whaleRight:{
        pitch:0,
        yaw:340,
        radius:0.05,
        distance:1
      },
      dolphins:{
        pitch:0,
        yaw:320,
        radius:0.05,
        distance:1
      }
    }
  }
};

function onLoad(){
  vrView=new VRView.Player(
    '#vrview',
    {
      image:'/img/blank.png',
      preview:'/img/blank.png',
      is_stereo:false
    }
  );
  vrView.on('ready',onVRViewReady);
  vrView.on('modechange',onModeChange);
  vrView.on('click',onHotspotClick);
  vrView.on('error',onVRViewError);
}

function onVRViewReady(e){
  console.log('onVRViewReady');
  loadScene('aft_deck');
}

function onModeChange(e){
  console.log('onModeChange',e.mode);
}

function onHotspotClick(e){
  console.log('onHotspotClick',e.id);
  if(e.id){
    loadScene(e.id);
  }
}

function loadScene(id){
  console.log('loadScene',id);
  vrView.setContent(
    {
      image:scenes[id].image,
      preview:scenes[id].preview,
      is_stereo:false
    }
  );

  var newScene=scenes[id];
  var sceneHotspots=Object.keys(newScene.hotspots);
  for(var i=0;i<sceneHotspots.length;i++){
    var hotspotKey=sceneHotspots[i];
    var hotspot=newScene.hotspots[hotspotKey];
    vrView.addHotspot(
      hotspotKey,
      {
        pitch:hotspot.pitch,
        yaw:hotspot.yaw,
        radius:hotspot.radius,
        distance:hotspot.distance
      }
    );
  }
}

function onVRViewError(e){
  console.log('Error! %s',e.message);
}

window.addEventListener('load',onLoad);
