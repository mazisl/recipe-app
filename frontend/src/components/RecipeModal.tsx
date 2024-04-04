import { useEffect, useState } from "react";
import { RecipeSummary } from "../types";
import * as RecipeApi from '../api'

interface RecipeModalProps {
  recipeId: string;
  onClose: () => void;
}

const RecipeModal = ({recipeId, onClose}: RecipeModalProps) => {

  const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>();

  useEffect(() => {
    const fetchRecipeSummary = async () => {
      try {
        const summaryOfRecipe = await RecipeApi.getRecipeSummary(recipeId);
        setRecipeSummary(summaryOfRecipe)
      } catch (err) {
        console.log(err)
      }
    }

    fetchRecipeSummary()
  }, [recipeId])

  if (!recipeSummary) {
    return <></>
  }

  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{recipeSummary?.title}</h2>
            <span className="close-btn" onClick={onClose}>&times;</span>
          </div>
          <p dangerouslySetInnerHTML={{__html: recipeSummary.summary}}></p>
        </div>
      </div>
    </>
  )
}

export default RecipeModal;