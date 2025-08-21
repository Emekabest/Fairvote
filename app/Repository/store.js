import { create } from 'zustand';
import HomeService from "../Service/HomeService";
import LoaderService from '../Service/LoaderService';


const useSharedStore = create((set) => ({
  value: LoaderService, // shared data
  navBar:{
    activeButton:"",

    setActiveButton(activeButtonName){
      this.activeButton = activeButtonName;
      console.log("Reached")

    },
    getActiveButton(){
      return this.activeButton
    }

  },

  recentlyVoted:false,

  homeData:HomeService,

  
  setValue: (newValue) => set({ value: newValue }),

  setNavBar:(newNavBar) => set({navBar: newNavBar}),

  setRecentlyVoted: (newRecentlyVoted) => set({recentlyVoted: newRecentlyVoted}),

  setHomeData:(newHomeData)=> set({homeData: newHomeData})
}));


export default useSharedStore;

