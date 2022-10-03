document.addEventListener("DOMContentLoaded", onLoaded);
//Charger le DOM pour modifier dynamiquement le contenu



function randint(min, max){ //Fonction du déplacement de bob aléatoirement
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




function onAgentUpdate(agent){

    let bonbon = document.getElementById('rotation')

    
    if (agent.d === 0){ //Tirer lorsque un adversaire est en face sinon ne pas tirer
        agent.fire(false);
    }
    else{
        agent.fire(true)
    }


    if (agent.dir === 0){                             //Rotation de l'image a l'est
    bonbon.style.transform = "rotate(90deg)";
    }
    else if ( agent.dir === 2){                     //Rotation de l'image l'ouest
        bonbon.style.transform ="rotate(-90deg)";
    }
    else if (agent.dir === 3){                         //Rotation de l'image au nord
        bonbon.style.transform ="rotate(180deg)";
    }
    else if (agent.dir === 1){
        bonbon.style.transform ="rotate(0deg)";
    }

    let dx = randint(-1,1); //Déplacement de bob aléatoirement
    let dy = randint(-1,1);
    console.log("Deplacement agent"+dx+ ","+dy);
    agent.move(dx,dy);
    agent.lookTo(randint(0,3)); //Orientation de bob
}




function onLoaded()
{
    console.log("Page chargée"); //Appeler la fonction et lire les paramètres dans l'ordre



    let href = (window.location.href);
    let url = new URL(href);
    let agentid = url.searchParams.get('agentid');           //afficher les parametres de l'url dans console et le nom de agentid
    let readonly = url.searchParams.get('readonly');
    if ( agentid === null ){
        console.log("agentid manquant");
        return;
    }
    if ( readonly === null ){
        console.log("readonly manquant");
        return;
    }



    if (readonly === "1")
        readonly = true;
    else
        readonly = false;









    console.log("Création de l'agent");
    let monAgent = new Agent(agentid, "demo", "demo", "iframebattlefx", 8080, "mqtt.jusdeliens.com", 4, readonly);

    monAgent.connect();
    monAgent.executeOnUpdate(onAgentUpdate);



    arrows = document.querySelectorAll(".arrow");
    ball = document.getElementById("ball");
    ball.style.top = 0;
    ball.style.left = 0;
    keepMoving = null;



    document.addEventListener('keydown', handleClick)
    document.addEventListener('keyup', stopMove)



    arrows.forEach((arrow) => {
        arrow.addEventListener('mousedown', handleClick)
        arrow.addEventListener('mouseup', stopMove)
    })



}