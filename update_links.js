
const fs = require('fs');
let html = fs.readFileSync('c:/Users/USER/Desktop/Prolanzs/prolanz-homepage.html', 'utf8');

// Update Footer Links
html = html.replace('<a href="#services">Search Engine Optimisation</a>', '<a href="service-seo.html">Search Engine Optimisation</a>');
html = html.replace('<a href="#services">Google &amp; Meta Ads</a>', '<a href="service-ppc.html">Google &amp; Meta Ads</a>');
html = html.replace('<a href="#services">Social Media Marketing</a>', '<a href="service-social.html">Social Media Marketing</a>');
html = html.replace('<a href="#services">Website Design &amp; CRO</a>', '<a href="service-web.html">Website Design &amp; CRO</a>');
html = html.replace('<a href="#services">Email Marketing</a>', '<a href="service-email.html">Email Marketing</a>');
html = html.replace('<a href="#services">Google Business Management</a>', '<a href="service-local.html">Google Business Management</a>');
html = html.replace('<a href="#services">Branding &amp; Identity</a>', '<a href="service-branding.html">Branding &amp; Identity</a>');
html = html.replace('<a href="#services">Marketing Training</a>', '<a href="service-training.html">Marketing Training</a>');

fs.writeFileSync('c:/Users/USER/Desktop/Prolanzs/prolanz-homepage.html', html, 'utf8');
console.log('Homepage links updated.');
