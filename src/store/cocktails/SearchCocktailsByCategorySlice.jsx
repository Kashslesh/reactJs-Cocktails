import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {urlApiByCategory} from "../../service/urls/urls";

const initialState = {
    cocktails : [],
    loading: false,
    error: false,
    isNotExist : false
}
const searchCocktailsSlice = createSlice({
    name: 'searchCocktailsByCategory',
    initialState,
    reducers:{
        clearCocktail : (state)=>{
            state.cocktails = []
        }
    },

    extraReducers: (builder) => {
        builder.addCase(
            searchCocktails.fulfilled,
            (state, action) => {
                if (!action.payload){
                    return{
                        ...state,
                        isNotExist: true,
                        loading: false
                    }
                }
                return {
                    ...state,
                    loading: false,
                    isNotExist: false,
                    cocktails: [...action.payload]
                }
            })
            .addCase(searchCocktails.pending,
                (state, action) => {
                    return {...state, loading: true, error: action.payload};
                })
            .addCase(searchCocktails.rejected,
                (state, action) => {
                   return {...state, loading: false, error: true};
                })
    }
})

export const {clearCocktail} = searchCocktailsSlice.actions
export const searchCocktails = createAsyncThunk(
    "cocktails/searchCocktails",
    async (cocktail,thunkAPI) => {
        return axios.get(urlApiByCategory(cocktail))
           .then(res => res.data.drinks)
    }
)

export default searchCocktailsSlice.reducer