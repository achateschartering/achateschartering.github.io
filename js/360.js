var vrView;
var scenes={
  aft_deck:{
    image:'/img/360/aft_deck_min.jpg',
    hotspots:{
      main_deck:{
        pitch:0,
        yaw:0,
        radius:0.05,
        distance:1
      },
      flybridge_center:{
        pitch:20,
        yaw:50,
        radius:0.05,
        distance:1
      }
    }
  },
  main_deck:{
    image:'/img/360/main_deck_min.jpg',
    hotspots:{
      aft_deck:{
        pitch:-10,
        yaw:10,
        radius:0.05,
        distance:1
      },
      master_cabin:{
        pitch:10,
        yaw:-175,
        radius:0.05,
        distance:1
      }
    }
  },
  flybridge_center:{
    image:'/img/360/flybridge_center_min.jpg',
    hotspots:{
      flybridge_helm:{
        pitch:-10,
        yaw:0,
        radius:0.05,
        distance:1
      },
      aft_deck:{
        pitch:90,
        yaw:110,
        radius:0.05,
        distance:1
      }
    }
  },
  flybridge_helm:{
    image:'/img/360/flybridge_helm_min.jpg',
    hotspots:{
      flybridge_center:{
        pitch:0,
        yaw:180,
        radius:0.05,
        distance:1
      }
    }
  },
  master_cabin:{
    image:'/img/360/master_cabin_min.jpg',
    hotspots:{
      main_deck:{
        pitch:-5,
        yaw:173,
        radius:0.05,
        distance:1
      },
      master_cabin_toilet:{
        pitch:10,
        yaw:-150,
        radius:0.05,
        distance:1
      },
      master_cabin_shower:{
        pitch:10,
        yaw:150,
        radius:0.05,
        distance:1
      },
      aft_cabin:{
        pitch:10,
        yaw:180,
        radius:0.05,
        distance:1
      }
    }
  },
  master_cabin_shower:{
    image:'/img/360/master_cabin_shower_min.jpg',
    hotspots:{
      master_cabin:{
        pitch:-10,
        yaw:50,
        radius:0.05,
        distance:1
      }
    }
  },
  master_cabin_toilet:{
    image:'/img/360/master_cabin_toilet_min.jpg',
    hotspots:{
      master_cabin:{
        pitch:-40,
        yaw:-70,
        radius:0.05,
        distance:1
      }
    }
  },
  aft_cabin:{
    image:'/img/360/aft_cabin_min.jpg',
    hotspots:{
      master_cabin:{
        pitch:-20,
        yaw:-107,
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
      is_stereo:false,
      is_autopan_off: false
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
      is_stereo:false,
      is_autopan_off: false
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

var _imgArray = ["aft_deck", "main_deck", "flybridge_center", "flybridge_helm", "master_cabin", "master_cabin_toilet", "master_cabin_shower", "aft_cabin"];
function loopImageLoader(i){
  var image1 = new Image();
  image1.src = scenes[_imgArray[i]]['image'];
  image1.onload = function(){
    i++;
    if(_imgArray.length != i){
      loopImageLoader(i);
    }
  }
}
loopImageLoader(0);

window.addEventListener('load',onLoad);
