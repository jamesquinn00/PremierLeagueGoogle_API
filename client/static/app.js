const searchbutton = document.querySelector('#searchbutton');
const form = document.querySelector('form');
const searchbar = document.querySelector('#searchbar');
const lucky = document.getElementById('lucky');
const resultsArea = document.querySelector('#results');

async function pageLoad(){
    resultsArea.textContent = "";
    const url = "http://localhost:4000/results"
    try{
        await fetch(url)
            .then(res => res.json())
            .then(results => {
        const num = Math.floor(Math.random() * results.length);
        lucky.setAttribute("href", results[num].link);
        }
    )} catch(err){
        console.log(err)
    }
}

form.addEventListener("submit", e=>{
    resultsArea.textContent = "";
    e.preventDefault();
    const searchData = new FormData(form);
    const entries = searchData.entries();
    const data = Object.fromEntries(entries);
    const url = "http://localhost:4000/results"
    try{ 
        fetch(url)
            .then(res => res.json())
            .then(results => {
        if(data.searchbar ===""){
            for(let x in results){
                displayTeam(results[x])
        }}
        else{
            getMatchByFootballTeamName(data.searchbar, results);
        }
        })
    } catch(err){
        console.log(err)
    }
})

function getMatchByFootballTeamName(query, teamList){
    failcount = 0
    for(let x in teamList){
        // console.log(teamList[x])
        let currentChoice= teamList[x]
        for(let content in teamList[x]){
            if(currentChoice[content].toLowerCase().includes(query.toLowerCase())){
                displayTeam(teamList[x])
                break
            } else {
                failcount++
            }
        }
    }
    // if statement to display 'no results' when no matches are found
    if (failcount == 4*teamList.length){
        const noResults = document.createElement('p')
        noResults.textContent = `No results found for '${query}''`
        noResults.setAttribute("id", "no-results")
        resultsArea.appendChild(noResults)
    }
}

function displayTeam(option){
    const list = document.createElement('ul');
    let newLi = document.createElement('a')
    for(const x in option){
        if(x==="link" || x==="name"){
            newLi = document.createElement('a')
            const url = option["link"]
            newLi.setAttribute("href",url)
            newLi.textContent = option[x];
            list.appendChild(newLi);
            resultsArea.appendChild(list)
        } else if(x!=="keywords"){
            newLi = document.createElement("li")
            newLi.textContent = option[x];
            list.appendChild(newLi);
            resultsArea.appendChild(list);
        }
    }    
}

