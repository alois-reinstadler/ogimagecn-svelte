import { error } from '@sveltejs/kit';
import { registry } from '$lib/catalog.js';
import { componentIndex } from '$lib/site/nav.js';
export const entries=()=>componentIndex.map(({name})=>({name}));
export const load=({params})=>{const meta=componentIndex.find(x=>x.name===params.name);const entry=registry.find(x=>x.name===params.name);if(!meta||!entry)error(404,'Komponente nicht gefunden');return {meta,props:Object.entries(entry.defaults).filter(([key])=>key!=='overlay').map(([name,value])=>({name,value:JSON.stringify(value)}))};};
