import styled from "styled-components";
import React, { useState } from "react";
import Axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


const Container = styled.div`
display: flex;
flex-direction: column;
`;

const Placeholder = styled.img`
  width: 200px;
  height: 200px;
  margin: 200px;
  opacity: 40%;
`;

const Header = styled.div`
  background-color: #331763;
  color: #9ba4bf;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 5px 6px 0 #555;
`;

const AppNameComponent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AppIcon = styled.img`
width: 36px;
height: 36px;
margin: 2px;
`;

const SearchComponent = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px 10px;
  border-radius: 8px;
  margin-right: 10%;
  width: 55%;
  background-color: white;
`;

const SearchInput = styled.input`
border:none;
outline: none;
margin-left: 15px;
font-size: 16px;
font-weight: bold;
`;

const RecipeList = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 30px;
justify-content: space-evenly;
`;

const RecipeContainer = styled.div`
display: flex;
flex-direction: column;
padding: 14px;
border-radius: 20px;
width: 350px;
box-shadow: 0 3px 10px 0 #aaa;
gap: 12px;
background-color: rgba(255, 255, 255, 0.3);
`;

const Image = styled.div`
height: 180px;
`;

const RecipeName = styled.div`
font-size: 18px;
font-weight: bold;
color: black;
margin: 1px 1px 0px 10px;
`;

const Ingredients = styled.div`
font-size: 20px;
border: solid 2px #331763;
margin: 5px 0;
cursor: pointer;
padding: 6px 15px;
border-radius: 30px;
color: #331763;
text-align: center;
background-color: rgba(255, 255, 255, 0.9);
`;

const MoreText = styled.div`
font-size: 20px;
border: solid 2px #77db04;
margin: 10px 0;
cursor: pointer;
padding: 6px 15px;
border-radius: 30px;
color: #77db04;
text-align: center;
background-color: rgba(255, 255, 255, 0.9);
`;

const RecipeComponent = (props) => {
  const [show, setShow] = useState(false);
  const { recipeObj } = props;

  return (
    <>
      <Dialog open={show}>
        <DialogTitle id="alert-dialog-slide-title"> Ingredients</DialogTitle>
        <DialogContent>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {recipeObj.ingredients.map((ingredientObj) => (
                <tr className="ingredient-list">
                  <td>{ingredientObj.text}</td>
                  <td>{ingredientObj.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <MoreText onClick={() => setShow("")}>Close</MoreText>
        </DialogActions>
      </Dialog>
      <RecipeList>
        <RecipeContainer>
          <img src={recipeObj.image} alt="" />
          <RecipeName> {recipeObj.label}</RecipeName>
          <Ingredients onClick={() => setShow(true)}> Ingredients </Ingredients>
          <MoreText onClick={() => window.open(recipeObj.url)}>  See More </MoreText>
        </RecipeContainer>

      </RecipeList>

    </>
  )
}


function App() {
  const [timeoutID, updateTimeoutID] = useState();
  const [recipeList, updateRecipeList] = useState([]);


  const fetchRecipe = async (searchString) => {
    const response = await Axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchString}&app_id=fcc7bbfb&app_key=befe4c257bf6d3a971e1103540f23972`
    );
    updateRecipeList(response.data.hits);
  };

  const textChange = (event) => {
    clearTimeout(timeoutID)
    const timeout = setTimeout(() => fetchRecipe(event.target.value), 400);
    updateTimeoutID(timeout);
  };

  return (
    <Container>
      <Header>
        <AppNameComponent>
          <AppIcon src="recipes-svgrepo-com.svg" />
          ReFind - Recipe Finder /AM
        </AppNameComponent>

        <SearchComponent>
          <img src="search-icon.svg" alt="" />
          <SearchInput placeholder="Search a recipe here..." onChange={textChange} />
        </SearchComponent>

      </Header>

      <RecipeList>

        {recipeList.length ?
          recipeList.map((recipeObj) => (
            <RecipeComponent recipeObj={recipeObj.recipe} />
          )) : <Placeholder src="search-icon.svg" />
        }


      </RecipeList>
    </Container>
  );
}

export default App;


//test