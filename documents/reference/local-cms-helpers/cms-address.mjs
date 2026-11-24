import {getCliClient} from 'sanity/cli';
const c=getCliClient({apiVersion:'2025-02-19'}).withConfig({useCdn:false});
if(c.config().projectId!=='4isekt9n')throw Error('Unexpected project');
const s=await c.getDocument('siteSettings');
const address=s.address.filter(line=>![s.title,s.department,s.university].includes(line));
const navigation=s.navigation.map(n=>n.path==='/achievements/'&&n.label==='Achievements'?{...n,label:'Achievements & News'}:n);
await c.patch(s._id).ifRevisionId(s._rev).set({address,navigation}).commit();
console.log('Address fields and navigation label aligned with the current website.');
