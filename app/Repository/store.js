import { create } from 'zustand';
import ConfirmationService from '../Service/ConfirmationService';
import HomeService from "../Service/HomeService";
import LoaderService from '../Service/LoaderService';


const useSharedStore = create((set) => ({
  value: LoaderService,
  navBar:{
    activeButton:"",

    setActiveButton(activeButtonName){
      this.activeButton = activeButtonName;

    },
    getActiveButton(){
      return this.activeButton
    }

  },

  homeData:HomeService,

  confirmation:ConfirmationService,

  isUserVote: false,

  manifestoImage:"",

  voteCategory:"",


  
  setValue: (newValue) => set({ value: newValue }),

  setNavBar:(newNavBar) => set({navBar: newNavBar}),

  setHomeData:(newHomeData)=> set({homeData: newHomeData}),

  setConfirmation:(newConfirmation)=> set({confirmation: newConfirmation}),

  setIsUserVote: (newIsUserVote) => set({isUserVote: newIsUserVote}),

  setManifestoImage: (newManifestoImage) => set({manifestoImage: newManifestoImage}),

  setVoteCategory: (newVoteCategory) => set({voteCategory: newVoteCategory}),


}));


export default useSharedStore;

