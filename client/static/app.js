const searchbutton = document.querySelector('#searchbutton');
const form = document.querySelector('form');
const searchbar = document.querySelector('#searchbar');
const lucky = document.getElementById('lucky');
const resultsArea = document.querySelector('#results');
// const randLink = document.getElementById('randLink');

function pageLoad(){
    resultsArea.textContent = "";
    const url = "http://localhost:4000/results"
    fetch(url)
    .then(res => res.json())
    .then(results => {
        const num = Math.floor(Math.random() * results.length);
        const randomChoice = results[num];
        const randomLink = randomChoice.link;
        console.log(randomLink);
        const anchorTag = randomLink;
        lucky.setAttribute("href", anchorTag);
        console.log(lucky);

})
}

form.addEventListener("submit", e=>{
    resultsArea.textContent = "";
    e.preventDefault();
    const searchData = new FormData(form);
    const entries = searchData.entries();
    const data = Object.fromEntries(entries);
    console.log(data.searchbar)
    const url = "http://localhost:4000/results"
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
})


function getMatchByFootballTeamName(query, teamList){
    console.log(teamList)
    for(let x in teamList){
        console.log(teamList[x])
        let currentChoice= teamList[x] 
        for(let content in teamList[x]){
         if(currentChoice[content].toLowerCase().includes(query.toLowerCase())){
            console.log("MATCH")
            displayTeam(teamList[x])
            break
            // return team;
        }
        }
    }
}

function displayTeam(option){
    const list = document.createElement('ul');
    for(const x in option){
        console.log(x)
        if(x==="link"){
            console.log("Here")
            const newLi = document.createElement('a')
            const url = option[x]
            newLi.setAttribute("href",url)
            list.appendChild(newLi)
            newLi.textContent = option[x];
            list.appendChild(newLi);
            resultsArea.appendChild(list)
        }
        else{
            const newLi = document.createElement("li");
        newLi.textContent = option[x];
        list.appendChild(newLi);
        resultsArea.appendChild(list)
        }
        
}

}