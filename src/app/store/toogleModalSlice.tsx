import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isOpenModalRegisterHomePage:false,
  isOpenModalContactHomePage:false
};

const toogleModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    toggleModalRegisterHomePage: (state) => {
      state.isOpenModalRegisterHomePage = !state.isOpenModalRegisterHomePage;
    },
    openModalRegisterHomePage: (state) => {
      state.isOpenModalRegisterHomePage = true;
    },
    closeModalRegisterHomePage: (state) => {
      state.isOpenModalRegisterHomePage = false;
    },
    toggleModalContactHomePage: (state) => {
      state.isOpenModalContactHomePage = !state.isOpenModalContactHomePage;
    },
    openModalContactHomePage: (state) => {
      state.isOpenModalContactHomePage = true;
    },
    closeModalContactHomePage: (state) => {
      state.isOpenModalContactHomePage = false;
    },
  },
});

export const { 
  toggleModal, openModal, closeModal,
  toggleModalRegisterHomePage,openModalRegisterHomePage,closeModalRegisterHomePage,
  toggleModalContactHomePage,openModalContactHomePage,closeModalContactHomePage

} = toogleModalSlice.actions;

export default toogleModalSlice.reducer;