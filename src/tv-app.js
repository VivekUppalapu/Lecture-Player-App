// import stuff
import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@lrnwebcomponents/video-player/video-player.js';
import "./tv-channel.js";

export class TvApp extends LitElement {
  // defaults
  constructor() {
    super();
    this.name = '';
    this.source = new URL('../assets/channels.json', import.meta.url).href;
    this.listings = [];
    this.sourceVideo = "https://www.youtube.com/watch?v=zLAYGZeVTPQ";
    this.currentInfo={
      title: null,
      timecode: null,
      description: null,
    }
  }
  // convention I enjoy using to define the tag's name
  static get tag() {
    return 'tv-app';
  }
  // LitElement convention so we update render() when values change
  static get properties() {
    return {
      name: { type: String },
      source: { type: String },
      listings: { type: Array },
      currentInfo:{type: Object}
    };
  }
  // LitElement convention for applying styles JUST to our element
  static get styles() {
    return [
      css`
      :host {
        display: block;
        margin: 16px;
        padding: 16px;
      }
      .grid-container 
      {
        display: grid;
        grid-template-columns: auto auto;
        background-color: white;
        padding: 10px;
        gap: 10px;
      }
      .grid-item1
      {
          height: 357px;
          width: 700px;
          
      }
      .videoScreen{
        height: 357px;
          width: 700px; 
      } 
      .grid-item2
        {
          height: 900px;
          width: 400px;
          border: 1px solid rgba(0, 0, 0, 0.8);
          background-color: grey;
        }
        .scroll-container 
        {
          width: 350px;
          height: 850px;
          overflow-y: auto;
          padding-top: 5px;
          padding-left: 25px;
        }
        .descriptionSlides
        {
          width: 700px;
          height: 250px;
          background-color: black;
          border:  1px solid red;
        }
        
      `
    ];
  }
  // LitElement rendering template of your element
  render() {
    return html `
      <div class="grid-container">
      <div class="grid-item2">
        <div class="scroll-container"> 
        
        ${
          this.listings.map(
            (list) => html`
            <tv-channel
            title= "${list.title}"
            timecode= "${list.metadata.timecode}"
            @click="${this.currentItem}"
          >
          </tv-channel>
            `
          )
        }
        </div>
        </div>
        <div class="grid-item1">
          <video-player source="${this.sourceVideo}"></video-player>
          <div class="descriptionSlides">
            
      </div>
        </div>
        </div>
      
    `;
    }
     
  // LitElement life cycle for when any property changes


  currentItem(e) {
    
    console.log(e.target);
    this.shadowRoot.querySelector('video-player').shadowRoot.querySelector('a11y-media-player').play();
    this.shadowRoot.querySelector('video-player').shadowRoot.querySelector('a11y-media-player').seek(e.target.timecode);
  }
   
  currentVidTime()
  {
    timeNow = this.shadowRoot.querySelector('video-player').shadowRoot.querySelector("a11y-media-player").media.currentTime;
    
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "source" && this[propName]) {
        this.updateSourceData(this[propName]);
      }
    });
  }

  async updateSourceData(data) {
    await fetch(data)
      .then((resp) => resp.ok ? resp.json() : [])
      .then((responseData) => {
        if (responseData.status === 200 && responseData.data.items && responseData.data.items.length > 0) 
        {
          this.listings = [...responseData.data.items];
          
        }

      });
  }
  

}
// tell the browser about our tag and class it should run when it sees it
customElements.define(TvApp.tag, TvApp);
