import BeerIcon from "../assets/svgs/beer-mug.svg";
import PizzaIcon from "../assets/svgs/pizza.svg";
import CoffeeIcon from "../assets/svgs/coffee.svg";

import GuitarIcon from "../assets/svgs/guitar.svg";
import ClimbingIcon from "../assets/svgs/climbing.svg";
import BookIcon from "../assets/svgs/book.svg";

import MjolnirIcon from "../assets/svgs/mjolnir.svg";
import IronManIcon from "../assets/svgs/iron-man.svg";
import CaptainAmericaIcon from "../assets/svgs/captain-america.svg";

const thoughtsData = [
  {
    leftThought: {
      svgComponent: GuitarIcon,
      title: "Guitar",
    },
    centerThought: {
      svgComponent: ClimbingIcon,
      title: "Climbing",
    },
    rightThought: {
      svgComponent: BookIcon,
      title: "Reading",
    },
  },
  {
    leftThought: {
      svgComponent: PizzaIcon,
      title: "Pizza",
    },
    centerThought: {
      svgComponent: BeerIcon,
      title: "Craft Beer",
    },
    rightThought: {
      svgComponent: CoffeeIcon,
      title: "Coffee",
    },
  },

  {
    leftThought: {
      svgComponent: MjolnirIcon,
      title: "Thor's Hammer",
    },
    centerThought: {
      svgComponent: CaptainAmericaIcon,
      title: "Cap's Shield",
    },
    rightThought: {
      svgComponent: IronManIcon,
      title: "Iron Man",
    },
  },
];

export default thoughtsData;
