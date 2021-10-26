class Drumkit{
    constructor()
    {
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.currentKick = './sounds/kick-classic.wav';
        this.currentSnare = './sounds/snare-acoustic01.wav';
        this.currentHihat = './sounds/hihat-acoustic01.wav';
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.select = document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll(".mute");
    }

    activePad()
    {
        this.classList.toggle('active');
    }
    repeat(){
        let step = this.index %8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //loop over the pads
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            //check if the pads are active
            if(bar.classList.contains('active')){
                //check each sound
                if(bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime =0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains('snare-pad')){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    
    start(){
        // we use arrow function here so that we can use this pointed
        // for class otherwise this starts pointing to window object which is the global object
        const interval = (60/this.bpm)*1000;
        //check if it's playing
        //NULL
        if(!this.isPlaying)
        {   
            this.isPlaying = setInterval(()=>{
                this.repeat();
            },interval);
            
        }
        else{
            //clear the interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
       
        
    }
    updateBtn(){
        if(!this.isPlaying)
        {
            this.playBtn.innerText = "Play";
            this.playBtn.classList.add('active');
        }
        else
        {
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.remove('active');
        }
    }
    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch (selectionName){
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;

        }
    }

    mute(e)
    {
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if(e.target.classList.contains("active"))
        {
            switch(muteIndex)
            {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        }
        else
        {
            switch(muteIndex)
            {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
       
}

const drumKit = new Drumkit();







//Event Listeners

drumKit.pads.forEach(pad => {
    pad.addEventListener("click",drumKit.activePad);
    pad.addEventListener('animationend',function(){
        this.style.animation = "";
    });
});


drumKit.playBtn.addEventListener('click',function(){
    drumKit.start();
    drumKit.updateBtn();
});

drumKit.select.forEach(select => {
    select.addEventListener('change',function(e){
        drumKit.changeSound(e);
    });
});

drumKit.muteBtns.forEach(btn =>{
    btn.addEventListener('click',function(e){
        drumKit.mute(e);
    })
})