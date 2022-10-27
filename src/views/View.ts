import { Model } from "../models/Model";

interface HasId {
  id?: number;
}
export abstract class View<T extends Model<K>, K extends HasId> {
  region: { [key: string]: Element } = {};
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }
  abstract template(): string;
  regionsMap(): { [key: string]: string } {
    return {};
  }
  eventsMap(): { [key: string]: () => void } {
    return {};
  }
  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let eventkey in eventsMap) {
      const [eventName, selector] = eventkey.split(":");
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventkey]);
      });
    }
  }
  mapRegion(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.region[key] = element;
      }
    }
  }
  onRender(): void{
    
  }
  render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.mapRegion(templateElement.content);
    this.bindEvents(templateElement.content);
    this.onRender(); 
    this.parent.appendChild(templateElement.content);
  }
}
