//Author: John Latz
//Date Created: 3/12/20

//can now use the DOM
require('jsdom-global')()

//create a new div element and set some attributes
var div = document.createElement('div');
div.setAttribute('className','select-box');
div.setAttribute('id','selbox');

//add the div to the html body
document.body.appendChild(div);

//an array of objects
var animal_array = [
  { label: 'Select an Option',
    value: 'Select an Option'
  },
  {
    label: 'Lion',
    value: 'Lion',
    description: 'The world\'s most social felines, lions roam the savannas and grassland of the African continent. Lions have strong, compact bodies and powerful forelegs, teeth and jaws for pulling down and killing prey.'
  },
  {
    label: 'Giraffe',
    value: 'Giraffe',
    description: 'The tallest mammals on Earth, Giraffes legs alone are taller than many humans - about 6 feet. They can run as fast as 35 miles an hour, or cruise at 10mph over long distanes.'
  },
  {
    label: 'Koala',
    value: 'Koala',
    description: 'Koalas can only live in one place in the world, Australia. They are well known for their large round head, big furry ears and black nose. These fuzzy animals are about 3 feet long and weight 10 pounds.'
  },
  {
    label: 'Orca Whale',
    value: 'Orca Whale',
    description: 'The largest member of the Dolphin family, Orcas aka killer whales, are easily distinguished by their black-and-white coloration. Being carnivors, they primarily prey upon seals, sea lions, and even other whales.'
  },
  {
    label: 'Emperor Penguin',
    value: 'Emperor Penguin',
    description: 'The Emperor penguin is the tallest and heaviest of all living penguin species. These fightless animals live on Antartic ice and in the frigid surrounding waters. They are recognizable by their black heads and back, white bellies with yellow trim around the neck.'
  },
  {
    label: 'Polar Bear',
    value: 'Polar Bear',
    description: 'Polar bears are stocky, with a long neck, relatively small head, short rounded ears, and a short tail. Their broad feet have hairy soles to protect and insulate as they move across the ice. They also have storng sharp claws for digging through ice and killing prey.'
  },
  {
    label: 'Bald Eagle',
    value: 'Bald Eagle',
    description: 'The only eagles solely native to North Amemrica, the bald eagles commonly live inland along rivers and large lakes. Both male and female are dark brown, with a white head and tail. The only yellow on them is their beak, eyes, and feet.'
  },
  {
    label: 'Komodo Dragon',
    value: 'Komodo Dragon',
    description: 'Reaching 10 feet in length and weighing more than 300 pounds, Komodo dragons are the heaviest lizards on Earth. They have long, flat heads with rounded snouts, scaly skin, bowed legs, and huge, muscular tails.'
  },
  {
    label: 'Alpaca',
    value: 'Alpaca',
    description: 'Most known for spitting on people, Alpacas have long legs, long necks, long ears, and weigh about 130 pounds. Their fur is long and dense, and varies in color from white to black, and many different shades of brown or tan.'
  },
  {
    label: 'Artic Wolf',
    value: 'Artic Wolf',
    description: 'Artic wolves have dense white fur, which helps keep them insulated and blend in with the snowy environment around them. Compared to other subspecies of wolves, they have smaller ears, shorter legs, and smaller muzzles.'
  },
];

//creating the selectbox and set some attributes
var selectTag = document.createElement("select");
selectTag.setAttribute('id', 'selectId');
selectTag.setAttribute('name', 'select');

//append the selectbox to the div created above
document.getElementById('selbox').appendChild(selectTag);

//dynamically building the selectbox options
animal_array.forEach(function(item, index, array) {
  var opt = document.createElement("option");
  opt.text = item.label;
  opt.value = item.value;
  opt.description = item.description;

  selectTag.add(opt);
});

//create another div for the animal descriptions
var div2 = document.createElement('div');
div2.setAttribute('id','textbox');
div2.setAttribute('style', 'position:absolute; left:150px; top: 10px');
div.appendChild(div2);

//When an option is clicked div2 will output the description of that animal
const activities = document.getElementById('selectId');
activities.addEventListener('change', (e) => {
  div2.textContent = (`${ activities.options[activities.selectedIndex].description }`);
});
