import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import p5 from "p5";
import { connect } from 'react-redux';
import { applyMiddleware } from 'redux';
import { useState, useEffect } from 'react';

function sketch(p) {

  var boxColor = p.color('#172A3A');
  let xPos = 100;
  let yPos = 100;
  let unstartedLength = 0;

  let status = '';
  let sketchAction = '';
  let lastAction = '';

  let num = 20; //remembers 20 positions
  let mouseXpos = [];
  let mouseYpos = [];

  let panelPosX = p.windowWidth/2;
  let panelPosY = 0;

  let panelLeftPosX = 0;
  let panelLeftPosY = 0;

  //dropBall
  let velocity = 0
  let y = 5
  let x = 33
  let radius = 15
  let acceleration = 0.3

  // network
  let nodesLength = 100; //initial
  let nodes = [];
  let nodeCount = 0;

  // connecting with useState
  let count
  let setCount

  // global
  let animalsState
  let setAnimalsState
  let nodesState
  let setNodesState

  // animals nodes
  let animalsNodes = []

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    // alert('props incoming');

    if (props.animalsState) {
      [animalsState, setAnimalsState] = props.animalsState
    }

    if(props.nodesState) {
      [nodesState, setNodesState] = props.nodesState
      console.log(nodesState,'NNNNN AME')
      nodeCount = nodesState.length


      if(nodeCount < nodes.length) {
        // nodes[nodeCount].setPosition();
        nodes[nodeCount].setRandomPosition();
        console.log(nodes[nodeCount],'New node')
        // nodeCount += 1;
        for (let i = 0; i < nodeCount; i ++) {
          // nodes[i].display();
          // nodes[i].displayNetwork(nodeCount);
          // nodes[i].displayFriends(nodeCount)
          // nodes[i].displayInterests(nodeCount);
          nodes[i].updateInterests();
        }
      }



    }

    if (props.countState) {
      [count, setCount] = props.countState;
      console.log(count,'COUNT ACCESS')
    }

    if (props.state) {
      console.log(props.state,'state -> from p5')
      console.log(props.state.store.getState(),'->')
      console.log(props.state.store.getState().lastAction.type,'-> last action')
      lastAction = props.state.store.getState().lastAction.type;


      // console.log('task items length', props.tasksLength);
      // if(props.tasksLength.Unstarted) {
      //   //unstarted length has been += 1
      //
      //   unstartedLength = props.tasksLength.Unstarted.length * 10;
      //   console.log(unstartedLength,'unstartedLength');
      //   status = 'unstarted'
      // }
      // if(props.tasksLength.Completed) {
      //   unstartedLength = props.tasksLength.Completed.length * 30;
      //   status = 'completed'
      // }
    }

    if (props.trigger) {
        console.log(props.trigger)
    }

    // if (props.onMousePressed) {
    //   p.mousePressed = function() {
    //     props.onMousePressed('will dispatch this');
    //
    //     boxColor = p.color(p.random(255),p.random(255),p.random(255));
    //   }
    // }
    /*
    -> so keep a global var
    -> this global var is used in the draw() {}
    -> global var gets changed according to the props handler
    -> when new props is listened, you can dispatch to redux store as well
    -> dispatch -> action creator -> return action object -> reducer handles the object -> updates the store -> selector (mapStateToProps) -> send back to components
    */

    /*
    -> so some things to try
    1. make square change location based on mouse input
       increment little by little

    2. visuals based on actions objects ->
      make change based on all action
      -> dispatch -> action creator => action object -> reducer -> updates store -> selector -> if new props exists -> update
    */
    p.mouseClicked = () => {

      setTimeout(()=>{lastAction = props.state.store.getState().lastAction.type
      props.state.store.getState().lastAction.type = null},2000) //hack
      // lastAction = props.state.store.getState().lastAction.type
      // props.state.store.getState().lastAction.type = null //hack
      // if(props.state.store.getState().lastAction.type != null) {
      //     lastAction = props.state.store.getState().lastAction.type
      //     setTimeout(()=>{
      //       props.state.store.getState().lastAction.type = null
      //     },2000)
      // } else if (lastAction = props.state.store.getState().lastAction.type == null){
      //
      // }
      console.log('lastaction', lastAction)

      setCount(count + 1)
    }
    p.mousePressed = () => {
      // if(nodeCount < nodes.length) {
      //   // nodes[nodeCount].setPosition();
      //   nodes[nodeCount].setRandomPosition();
      //   console.log(nodes[nodeCount],'New node')
      //   // nodeCount += 1;
      // }
      //
      // for (let i = 0; i < nodeCount; i ++) {
      //   // nodes[i].display();
      //   // nodes[i].displayNetwork(nodeCount);
      //   // nodes[i].displayFriends(nodeCount)
      //   // nodes[i].displayInterests(nodeCount);
      //   nodes[i].updateInterests();
      // }

      for (let i = 0; i < nodesLength; i ++) {
        console.log(nodes[i],'CHECK THE UPDATE')
      }
    }

    p.keyPressed = () => {
      boxColor = p.color(p.random(255),p.random(255),p.random(255));
      xPos += 100;

      sketchAction = 'ELLIPSE'

      }
    p.keyReleased = () => {
      sketchAction = 'SOMETHING'
    }

  } //okay this is special method nice


  //sideEffects based on action.type

  function ellipseAcross() {
    for (let y = 0; y <= p.windowHeight; y+= 40) {
      for (let x = 0; x <= p.windowWidth; x+=40) {
        p.fill(255);
        p.ellipse(x, y, 40, 40)
        x+=1;
        y+=1;
      }
    }
  }

  function somethingAcross() {
    for(let i = 20; i< 4000; i += 20) {
      p.line(i, 0, i+ i/2, 80);
    }
  }


  p.setup = function() {
    console.log('setup running', p);
    p.ellipseMode(p.RADIUS);

    // p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.createCanvas(p.windowWidth, p.windowHeight);

    //for mouse
    for (let i = 0; i < num; i++) {
      mouseXpos[i] = 0;
      mouseYpos[i] = 0;
    }

    for (let i = 0; i < nodesLength; i ++) {
      let ranRadius = p.random(5, 10)
      nodes[i] = new Node(i, nodes, ranRadius, animalsNodes);
      nodes[i].setRandomPosition();
    }

    for (let i = 0; i < animalsState.length; i ++) {
      animalsNodes[i] = new Node(100+i, nodes, 10, animalsNodes);
      animalsNodes[i].setAnimalsPosition()
      // animalsNodes[i].displayInterests(nodeCount); // but needs to be in draw
      // animalsNodes[i].displayAnimals();
    }

  } // end of setup


  class Node {
    constructor(id, otherNodes, radius, animalsNodes){
      this.x = null;
      this.y = null;
      this.radius = radius;
      this.id = id;
      this.otherNodes = otherNodes;
      this.outerRadius = radius * 4;
      this.friendsList = [1,2,3]
      this.interests = [] //empty one for now?
      this.animalsNodes = animalsNodes;
      this.name = ''
      // this.matchCounter = 0;
      this.matchedInterests = {}


      if(this.id >= 100) {
        this.identity = 'animals'
        this.fillColor = p.color(p.random(255),p.random(255),p.random(255),50);
      } else {
        this.identity = 'users'
      }

      nodesState.forEach(each => {
        if(this.id === each.id) {
          this.interests = each.interests
          // console.log(this, 'THEY MATCHED')
          this.name = each.name   // this is used for initial setups

        }
      })

      animalsState.forEach(each => {
        if(this.id === each.id) {
          this.interests = each.interests
          this.name = each.name
        }
      })

      // if(this.id == 100) {
      //   this.interests = animalsState[0].interests
      // }

      // this.animalsPosX = p.random(500)
      // this.animalsPosY = p.random(500)

      console.log(this, `# ${this.id} node`);

    }


    updateInterests(){
      nodesState.forEach(each => {
        if(this.id === each.id) {
          this.interests = each.interests
          // console.log(this, 'THEY MATCHED')
          this.name = each.name   //also updating name - so that when new one comes, it renders the most recent updated value - derived from the props.state
        }
      })
    }

    setPosition() {
      this.x = p.mouseX;
      this.y = p.mouseY;
    }

    setAnimalsPosition() {
      let offSet = 400
      this.animalsPosX = offSet + p.random(200)
      this.animalsPosY = offSet + p.random(200)
    }

    setRandomPosition() {

      this.x = p.random(p.width)
      this.y = p.random(p.height)
    }

    displayAnimals() {

      p.fill(this.fillColor);
      p.ellipse(this.animalsPosX,this.animalsPosY,this.radius,this.radius)
      p.textAlign(p.CENTER,p.CENTER);
      p.text(`${this.name} id${this.id}`,this.animalsPosX, this.animalsPosY)

    }

    display() {
      p.fill(255,40);
      p.ellipse(this.x,this.y,this.radius,this.radius)
      p.fill(22, 40);
      p.ellipse(this.x, this.y, this.outerRadius, this.outerRadius)
      p.textAlign(p.CENTER,p.CENTER);
      p.text(`${this.name} id${this.id}`,this.x, this.y)
    }

    overlap(n) {
      let distanceFromCenters = p.dist(this.x, this.y, n.x, n.y);
      let diameter = this.outerRadius + n.outerRadius;
      if (distanceFromCenters < diameter) {
        return true;
      } else {
        return false;
      }
    }

    trueFriends(n) {
      p.stroke(20)
      if(n.id in this.friendsList === true) {
        return true
      } else {
        return false;
      }
    }

    displayNetwork(nodeCount) {
      p.stroke(5)

      // console.log(this.id, nodeCount)
      for (let i = this.id+1; i < nodeCount; i ++) {
        if(this.overlap(this.otherNodes[i])) {
          p.line(this.x, this.y, this.otherNodes[i].x, this.otherNodes[i].y)
        }
      }
    }


    // sameInterests(n) {
    //   p.stroke(6);
    //
    //   // console.log(n.interests,'n interests')
    //   animalsState.forEach(each => {  //['c','d']
    //     // console.log(each.interests, 'each.interests')
    //     this.findCommonElements3(n.interests, each.interests)
    //   })
    //
    //   // n.interests.forEach(each => {
    //   //   if(each in animalsState.interests) {
    //   //     return true
    //   //   } else {
    //   //     return false
    //   //   }
    //   // })
    //
    //
    // }
    //
    // displayInterests(nodeCount) {
    //   for (let i = this.id+1; i < animalsNodes.length; i ++) {
    //     if(this.sameInterests(this.animalsNodes[i])) {
    //       p.line(this.x, this.y, 0,0)
    //     }
    //   }
    // }

    findCommonElements3(arr1, arr2) {
      arr2.forEach(each => {
        arr1.some(item => {
          each.interests.includes(item)
          console.log('common found', item)
          return true
        })
        return false
        // if( arr1.some(item => each.interests.includes(item)) ) {
        //
        //   return true
        // } else {
        //   return false
        // }
      })

    }

    sameInterests(n) {
      //n is the other nodes
      // let ans = this.findCommonElements3(n.interests, this.animalsNodes)
      let matchFound = false;
      // console.log(this.interests,'THIS DOT INTERESTS')
      n.interests.forEach(each => {
        // console.log(each,'EACH')
        // if(each.includes("A")) {
        //   return true;
        // } else {
          // console.log('what')
        // }
        // console.log(this.interests,'tis inter')
        // console.log(each, 'N - EACH INTEREST')

        if(this.interests.includes(each)) {
          // console.log('HELL YA', each)
          matchFound = true;

          // if(!n.matchedInterests.includes(each)) {
          //   n.matchedInterests.push(each)
          // }
          if(this.id in n.matchedInterests) {
            if(!n.matchedInterests[this.id].includes(each)) {
              n.matchedInterests[this.id].push(each)
            }
          } else {
            n.matchedInterests[this.id] = [each]
          }
          // n.matchCounter += 1;         //LEO fix this
          // return
        }
        // if(each in this.interests === true) {
        //   // console.log(each, 'found in ',each.id)
        //   console.log(each,'found found')
        // //
        // //   matchFound = true
        // //   return true;
        // }
        // return false


        // this.animalsNodes.forEach(item => {
        //   if (item.interests.includes(each)) {
        //     matchFound = true;
        //   }
        // })
      })
      return matchFound






      //
      // let ans = this.animalsNodes.forEach(each => {
      //   if(n.interests.some(item => each.interests.includes(item))) {
      //     return true;
      //   }else{
      //     return false;
      //   }
      // })
      // console.log(ans,'ans')

      // let ans = this.animalsNodes.forEach(each => n.interests.some(item => each.interests.includes(item)))
      //
      // if (ans) {
      //   return true
      // } else {
      //   return false
      // }

    }

    displayInterests(nodeCount) {
      // from nodes view
      // need to go from many to small - right now its small to many
      for (let i = 0; i < nodeCount; i ++) {
        if(this.sameInterests(this.otherNodes[i])) {
          p.stroke(this.fillColor)
          // p.strokeWeight(this.otherNodes[i].matchedInterests.length * 5)
          let sweight = this.otherNodes[i].matchedInterests[this.id].length
          p.strokeWeight(sweight * 5)
          p.line(this.animalsPosX, this.animalsPosY, this.otherNodes[i].x, this.otherNodes[i].y)
          p.stroke(0)
          p.strokeWeight(1)
          // alert('wait')
        }

      }
    }

    //need a counter that counts how significant is the interest - among two

    displayFriends(nodeCount) {
      for (let i = this.id+1; i < nodeCount; i ++) {
        if(this.trueFriends(this.otherNodes[i])) {
          p.line(this.x, this.y, this.otherNodes[i].x, this.otherNodes[i].y)
        }
      }
    }

  }


  p.draw = function() {
    // p.translate(-p.width/2,-p.height/2,0); //for webgl
    p.clear()

    // followMouse();
    mouseEllipse();

    for (let i = 0; i < nodeCount; i ++) {
      nodes[i].display();
      nodes[i].displayNetwork(nodeCount);
      // nodes[i].displayFriends(nodeCount)
      // nodes[i].displayInterests(nodeCount);
      // nodes[i].updateInterests();


    }

    for (let i = 0; i < animalsState.length; i ++) {

      animalsNodes[i].displayAnimals();
      // animalsNodes[i].displayInterests(animalsNodes.length);
      animalsNodes[i].displayInterests(nodeCount);
    }

    // ellipseAcross();
    p.fill(boxColor);
    p.rect(xPos, yPos + unstartedLength, 100, 100);

    p.fill(0);
    p.text(`${status}`, 10, 30);
    // p.blendMode(p.BLEND);

    if (sketchAction == 'ELLIPSE') {
      // ellipseAcross();
    } else if (sketchAction == 'SOMETHING') {
      // somethingAcross();
    }

    if (lastAction === "@@INIT") {
      ellipseAcross();
    } else if (lastAction === "RECEIVE_ENTITIES") {
      somethingAcross();
    } else if (lastAction === "COUNT_UP") {
      xPos += 1;

      if(xPos >= 500){
        lastAction = ''
      }
    }
    if (lastAction === 'CREATE_COMMENT') {
      slidePanel();
    }
    if (lastAction === "CHANGE_PAGE") {
      slidePanelLeft();
      slidePanel();
    }

    if (slidePanelLeft.done == true) {
      dropBall();
    }



  } // end of draw


  // sideEffects
  function slidePanel(){
    p.fill(0);
    p.rect(panelPosX, panelPosY, p.width/2, p.height);
    p.noStroke();

    if (panelPosX < (panelPosX + p.width/2)) {
      panelPosX += 10;
    }

    if (panelPosX >= (p.width)) {
      lastAction = ''
      panelPosX = p.width/2;
    }
  }

  function slidePanelLeft() {
    p.fill(0);
    p.rect(panelLeftPosX, panelLeftPosY, p.width/2, p.height);
    p.noStroke();

    if (panelLeftPosX > (-p.width/2)) {
      panelLeftPosX -= 10;
    }

    if (panelLeftPosX <= (-p.width/2)) {
      lastAction = ''
      panelLeftPosX = 0;
      slidePanelLeft.done = true;
    }
  }


  function dropBall(xPos = x) {
    p.fill(12,12);
    velocity += acceleration;
    y += velocity;
    if (y > (p.height-radius)) {
      y = p.height - radius;
      velocity = - velocity;
    }
    p.ellipse(xPos, y, radius, radius);

  }

  function mouseEllipse() {
    // console.log('folowing??')
    p.stroke(1);
    p.noFill();
    p.ellipse(p.mouseX, p.mouseY, 15, 15)
  }

  function followMouse(){
    //copy array values from back to front
    for (let i = num-1; i > 0; i--) {
      mouseXpos[i] = mouseXpos[i-1];
      mouseYpos[i] = mouseYpos[i-1];
    }
    mouseXpos[0] = p.mouseX;//set the first element
    mouseYpos[0] = p.mouseY;
    for (let i = 0; i < num; i ++) {
      // p.noStroke();
      p.noFill();
      p.stroke(i * 5);
      p.ellipse(mouseXpos[i], mouseYpos[i], 40, 40)
    }
  }


}// end of sketch


const initialNodes = [
  {
    id: 0,
    interests: ['T','I','G','E','R','D','O'],
    name:'tiger person',
  },
  {
    id: 1,
    interests: ['D','O','G'],
    name:'dog person',
  },
  {
    id: 2,
    interests: ['L','I','O','N','D','H'],
    name:'Lion person',
  },
  {
    id: 3,
    interests: ['C','A','T'],
    name:'Cat person',
  },
  {
    id: 4,
    interests: ['D','O','L','P','H','I','N'],
    name:'Dolphin person',
  }
]

/*
const initialAnimals = [
  {
    id:100,
    name: 'TIGER',
    interests: ['T','I','G','E','R'],
  },
  {
    id:101,
    name:'DOG',
    interests: ['D','O','G'],
  },
  {
    id:102,
    name:'LION',
    interests: ['L','I','O','N'],
  },
  {
    id:103,
    name:'CAT',
    interests: ['C','A','T'],
  },
  {
    id:104,
    name:'DOLPHIN',
    interests: ['D','O','L','P','H','I','N'],
  }
]
*/

const initialAnimals = [
  {
    id:100,
    name: 'Cheerful',
    interests: [ "Joyful", "Animated", "Buoyant", "Cheery", "Chipper", "Chirpy", "Effervescent", "Enthusiastic", "Good-Natured", "Jaunty", "Jolly", "Bright", "Lighthearted", "Lively", "Merry", "Optimistic", "Peppy", "Perky", "Pleasant", "Rosy", "Sanguine", "Sunny", "Upbeat" ] ,
  },
  {
    id:101,
    name:'Reflective',
    interests: [ "Reflective", "Thoughtful", "Introspective", "Contemplative", "Meditative", "Pensive", "Studious", "Deliberate", "Diligent", "Earnest", "Industrious", "Calculated", "Careful", "Meticulous", "Cautious", "Premeditated", "Prudent", "Purposeful", "Cold-Blooded", "Conscious", "Bookish", "Willful" ]
  },
  {
    id:102,
    name:'Gloomy',
    interests: [ "Dull", "Gloomy", "Murky", "Funereal", "Dismal", "Bleak", "Cloudy", "Dark", "Impenetrable", "Dim", "Opaque", "Overcast", "Foggy", "Forlorn", "Frosty", "Weighty", "Dirty", "Grim", "Hazy", "Blurred", "Impassable", "Bulletproof", "Impervious", "Melancholy", "Misty", "Mournful", "Muddy", "Dreary", "Dense", "Earnest", "Sedate", "Serious", "Sober", "Solemn", "Solid", "Somber", "Thick", "Heavy" ]
  },
  {
    id:103,
    name:'Humorous',
    interests: [ "Droll", "Entertaining", "Amusing", "Comical", "Engaging", "Enjoyable", "Pleasant", "Pleasing", "Fun", "Delicious", "Delightful", "Diverting", "Beautiful", "Eccentric", "Enchanting", "Campy", "Captivating", "Charming", "Fascinating", "Comic", "Funny", "Gratifying", "Hilarious", "Humorous", "Interesting", "Lively", "Lovely", "Luscious", "Mischievous", "Odd", "Playful", "Alluring", "Delectable", "Refreshing", "Satisfying", "Thrilling", "Unusual", "Weird", "Whimsical" ],
  },
  {
    id:104,
    name:'Melancholy',
    interests: [ "Sad", "Deplorable", "Distressing", "Dreadful", "Mournful", "Painful", "Tragic", "Lamentable", "Dire", "Appalling", "Downbeat", "Downcast", "Atrocious", "Egregious", "Excruciating", "Flagrant", "Frightening", "Glaring", "Gloomy", "Grim", "Harrowing", "Heartbreaking", "Heartrending", "Heinous", "Intolerable", "Agonizing", "Low", "Lugubrious", "Melancholy", "Monstrous", "Moody", "Blue", "Outrageous", "Calamitous", "Pensive", "Plaintive", "Poignant", "Regrettable", "Damaging", "Shameful", "Shocking", "Somber", "Sorrowful", "Sorry", "Touching", "Affecting", "Trite", "Troublesome", "Unbearable", "Wistful" ] ,
  },
  {
    id:105,
    name:'Idyllic',
    interests: [ "Pastoral", "Admire", "Beautiful", "Bloodless", "Bucolic", "Calm", "Charming", "Colorful", "Dream", "Glorify", "Harmonious", "Idealized", "Neutral", "Nonviolent", "Amicable", "Peace-Loving", "Peaceful", "Picturesque", "Placid", "Pleasant", "Quaint", "Quiet", "Rustic", "Scenic", "Smooth", "Steady", "Tranquil", "Unspoiled" ]
  },
  {
    id:106,
    name:'Whimsical',
    interests: [ "Funny", "Whimsical", "Eccentric", "Entertaining", "Erratic", "Humorous", "Odd", "Quirky", "Weird", "Absurd", "Arbitrary", "Bizarre", "Farcical", "Fickle", "Flighty", "Careless", "Goofy", "Helter-Skelter", "Comic", "Idiosyncratic", "Impulsive", "Ironic", "Kooky", "Amusing", "Ludicrous", "Mischievous", "Nutty", "Comical", "Offbeat", "Outlandish", "Peculiar", "Curious", "Ridiculous", "Silly", "Strange", "Temperamental", "Unconventional", "Unpredictable", "Unreasonable", "Unstable", "Unusual", "Volatile", "Wacky", "Wayward", "Droll", "Laughable" ]
  },
  {
    id:107,
    name:'Romantic',
    interests: [ "Fantastic", "Adventurous", "Charming", "Colorful", "Corny", "Dreamy", "Erotic", "Exciting", "Exotic", "Fanciful", "Amorous", "Fascinating", "Glamorous", "Maudlin", "Mysterious", "Nostalgic", "Passionate", "Tender", "Utopian", "Whimsical" ]
  },
  {
    id:108,
    name:'Mysterious',
    interests: [ "Enigmatic", "Mysterious", "Strange", "Weird", "Marvelous", "Dark", "Eerie", "Enchanted", "Enchanting", "Ambiguous", "Equivocal", "Extraordinary", "Fascinating", "Incomprehensible", "Inexplicable", "Inquisitive", "Inscrutable", "Interested", "Magic", "Magical", "Arcane", "Miraculous", "Baffling", "Mystical", "Mystifying", "Mythical", "Obscure", "Otherworldly", "Perplexing", "Puzzling", "Secretive", "Spellbinding", "Spooky", "Cryptic", "Uncanny", "Unknown", "Unusual", "Vague", "Veiled", "Curious", "Wonderful" ]
  },
  {
    id:109,
    name:'Calm',
    interests: [ "Amicable", "Mild", "Placid", "Serene", "Congenial", "Cool", "Coordinated", "Cordial", "Easygoing", "Gentle", "Harmonious", "Low-Key", "Tranquil", "Balanced", "Peaceful", "Balmy", "Restful", "Sedate", "Calm", "Slow", "Smooth", "Sober", "Soothing", "Stable", "Tame", "Temperate", "Pastoral" ]
  },
  {
    id:110,
    name:'Lighthearted',
    interests: [ "Lively", "Joyous", "Comical", "Flirtatious", "Frisky", "Good-Natured", "Impish", "Joking", "Jolly", "Jovial", "Cheerful", "Laid-Back", "Lighthearted", "Buoyant", "Mischievous", "Playful", "Spirited", "Sprightly", "Tongue-In-Cheek", "Upbeat", "Whimsical" ]
  },
  {
    id:111,
    name:'Hopeful',
    interests: [ "Buoyant", "Rosy", "Sanguine", "Hopeful", "Comfortable", "Confident", "Eager", "Encouraging", "Enthusiastic", "Greedy", "Happy", "Ambitious", "Hungry", "Impatient", "Keen", "Optimistic", "Positive", "Restless", "Cheerful", "Cheery", "Thirsty", "Trusting", "Upbeat" ]
  },
  {
    id:112,
    name:'Angry',
    interests:[ "Fiery", "Affronted", "Angry", "Annoyed", "Antagonized", "Bitter", "Bothered", "Chafed", "Choleric", "Convulsed", "Cross", "Displeased", "Disturbed", "Enraged", "Exacerbated", "Exasperated", "Ferocious", "Fierce", "Angered", "Fuming", "Furious", "Galled", "Hateful", "Heated", "Impassioned", "Indignant", "Irate", "Irked", "Irritable", "Irritated", "Offended", "Outraged", "Provoked", "Resentful", "Sullen", "Troubled", "Uptight" ]
  },
  {
    id:113,
    name:'Fearful',
    interests: [ "Panicky", "Afraid", "Anxious", "Shy", "Aroused", "Frightened", "Hesitant", "Jittery", "Nervous", "Agitated", "Scared", "Fearful", "Skittish", "Spooked", "Startled", "Tense", "Timid", "Uneasy", "Unnerved" ]
  },
  {
    id:114,
    name:'Tense',
    interests: [ "Close", "Firm", "Rigid", "Stiff", "Strained", "Taut" ]
  },
  {
    id:115,
    name:'Lonely',
    interests: [ "Isolated", "Desolate", "Deserted", "Empty", "Lonely", "Eremitic", "Cloistered", "Derelict", "Abandoned", "Antisocial", "Destitute", "Apart", "Alone", "Forlorn", "Hermetic", "Homeless", "Homesick", "Ascetic", "Barren", "Lonesome", "Neglected", "Reclusive", "Solitary", "Uninhabited" ],
  },
]

function Sketch(props, action) {
  const [count, setCount] = useState(0);
  const [nodesState, setNodesState] = useState(initialNodes);
  const [animalsState, setAnimalsState] = useState(initialAnimals)
  const [nodeName, setNodeName] = useState('');
  const [nodeInterest, setNodeInterest] = useState('');
  const [nodeInterest2, setNodeInterest2] = useState('');
  const [nodeInterest3, setNodeInterest3] = useState('');
  const [nodeInterest4, setNodeInterest4] = useState('');

  console.log(props,'SKETCH PROPS CHECK ACTION')
  console.log(action, 'action!!')
  console.log(props.state.store.getState())


  const resetForm = () => {
    setNodeName('')
    setNodeInterest('')
    setNodeInterest2('')
    setNodeInterest3('')
    setNodeInterest4('')
  }


  const onCreateNode = (e) => {
    e.preventDefault();
    let newNode = {
      id:nodesState.length,
      interests: [nodeInterest, nodeInterest2, nodeInterest3, nodeInterest4],
      name: nodeName,
    }
    console.log(newNode, 'newNode')
    setNodesState([...nodesState, newNode])
    console.log(nodesState,'NO STATE')

    resetForm();
  }

  const onChangeNodeName = (e) => {
    setNodeName(e.target.value)
  }

  const onChangeInterest = (e) => {
    setNodeInterest(e.target.value)
  }

  const onChangeInterest2 = (e) => {
    setNodeInterest2(e.target.value)
  }

  const onChangeInterest3 = (e) => {
    setNodeInterest3(e.target.value)
  }

  const onChangeInterest4 = (e) => {
    setNodeInterest4(e.target.value)
  }




  useEffect(()=>{
    console.log(nodesState,'NO STATE from useeffect')
  })


  return (
    <div >
      <p>You clicked {count} times!!</p>
      <p>Currently {nodesState.length} nodes</p>
      <form
        onSubmit={onCreateNode}
      >
        <input
          className="full-width-input"
          onChange={onChangeNodeName}
          value={nodeName}
          type="text"
          placeholder="node name..."
        />
        <input
          className="full-width-input"
          onChange={onChangeInterest}
          value={nodeInterest}
          type="text"
          placeholder="interest... a,b,c"
        />
        <input
          className="full-width-input"
          onChange={onChangeInterest2}
          value={nodeInterest2}
          type="text"
          placeholder="interest2... a,b,c"
        />
        <input
          className="full-width-input"
          onChange={onChangeInterest3}
          value={nodeInterest3}
          type="text"
          placeholder="interest3... a,b,c"
        />
        <input
          className="full-width-input"
          onChange={onChangeInterest4}
          value={nodeInterest4}
          type="text"
          placeholder="interest4... a,b,c"
        />

        <button
          className="button"
          type="submit"
        >
          Save
        </button>

      </form>

      <div className="mySketch">
        <P5Wrapper

          countState={[count, setCount]}
          nodesState={[nodesState, setNodesState]}
          animalsState={[animalsState, setAnimalsState]}
          sketch={sketch}
          onMousePressed={props.onMousePressed}
          state={props.state}
          trigger={props.name}  />
      </div>

    </div>
  )
}





//
// const logger = store => next => action => {
//   console.log('HIYAA')
//   console.group(action.type);
//   console.log('dispatching: ', action);
//   const result = next(action);
//   // at this point, action is sent to the reducer
//   // logs from here on is after the store is updated
//
//   console.log('next state: ', store.getState()) // we have this bc store is passed on
//   console.groupEnd(action.type)
//
//   return result;
// }




export default connect()(Sketch);
// export default Sketch;
