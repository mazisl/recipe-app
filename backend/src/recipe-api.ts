const apiKey = process.env.API_KEY;

export const searchRecipes = async (searchTerm: string, page: number) => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

  const queryParams = {
    apiKey,
    query: searchTerm,
    number: "10",
    offset: (page * 10).toString(),
  };

  //this line creates a new URLSearchParams obj for the url above using the queryParams defined above, so the full url will look like this: https://api.spoonacular.com/recipes/complexSearch?apiKey=yourApiKey&query=searchTerm&number=10&offset=0
  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url);
    const resultsJson = await searchResponse.json();
    return resultsJson;
  } catch (error) {
    console.log(error);
  }
};

//creating recipe summary endpoint
export const getRecipeSummary = async (recipeId: string) => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`);

  const params = {
    apiKey: apiKey
  }

  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url);
  const json = await response.json();

  return json;
}

//create fav recipes endpoint
export const getFavoriteRecipesByIDs = async (ids: string[]) => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const url = new URL("https://api.spoonacular.com/recipes/informationBulk");
  const params = {
    apiKey: apiKey,
    ids: ids.join(","),
  };
  url.search = new URLSearchParams(params).toString();

  const searchResponse = await fetch(url);
  const json = await searchResponse.json();

  return { results: json };
};