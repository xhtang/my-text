import { Component, OnInit } from '@angular/core';
import * as jsMind from './jsmind/js/jsmind.js';

const options = {
  container:'jsmind_container',
  theme:'greensea',
  editable:true
}

const mind = {
  "meta":{
      "name":"jsMind remote",
      "author":"hizzgdev@163.com",
      "version":"0.2"
  },
  "format":"node_tree",
  "data":{"id":"root","topic":"jsMind","children":[
      {"id":"easy","topic":"Easy","direction":"left","children":[
          {"id":"easy1","topic":"Easy to show"},
          {"id":"easy2","topic":"Easy to edit"},
          {"id":"easy3","topic":"Easy to store"},
          {"id":"easy4","topic":"Easy to embed"}
      ]},
      {"id":"open","topic":"Open Source","direction":"right","children":[
          {"id":"open1","topic":"on GitHub", "background-color":"#eee", "foreground-color":"blue"},
          {"id":"open2","topic":"BSD License"}
      ]},
      {"id":"powerful","topic":"Powerful","direction":"right","children":[
          {"id":"powerful1","topic":"Base on Javascript"},
          {"id":"powerful2","topic":"Base on HTML5"},
          {"id":"powerful3","topic":"Depends on you"}
      ]},
      {"id":"other","topic":"test node","direction":"left","children":[
          {"id":"other1","topic":"I'm from local variable"},
          {"id":"other2","topic":"I can do everything"}
      ]}
  ]}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  mindMap;

  ngOnInit() {
    this.mindMap = jsMind.show(options, mind);
  }

  removeNode() {
    // 这里注意程序的鲁棒性
    const selected_id = this.mindMap.get_selected_node();
    if(!selected_id){
      console.log('please select a node first.');
      return;
    }

    this.mindMap.remove_node(selected_id);  

  }

  addNode() {
    const selected_node = this.mindMap.get_selected_node(); // as parent of new node
    if(!selected_node){
      console.log('please select a node first.');
      return;
    }

    const nodeid = jsMind.util.uuid.newid();
    const topic = '* Node_'+nodeid.substr(0,5)+' *';
    const node = this.mindMap.add_node(selected_node, nodeid, topic);
  }  


}