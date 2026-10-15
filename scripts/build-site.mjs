import {spawnSync} from 'node:child_process';
import {cpSync,writeFileSync,mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const build=spawnSync('npm',['run','build','--','--base=/apps/necromund-ai/'],{cwd:root+'source/necromund-ai',stdio:'inherit'});
if(build.status!==0)process.exit(build.status??1);
// Keep old hashed assets during the candidate period so an already loaded tab can finish.
cpSync(root+'source/necromund-ai/dist',root+'public/apps/necromund-ai',{recursive:true});
mkdirSync(root+'public',{recursive:true});writeFileSync(root+'public/.nojekyll','');
console.log('Packaged app at public/apps/necromund-ai/; existing shell stylesheet retained and precached.');
