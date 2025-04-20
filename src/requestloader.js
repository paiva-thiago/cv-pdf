const formatData = (jobs)=>{
    for(let j of jobs){
        j.txt = j.txt.replaceAll('<br>','\n')
                 .replaceAll('<p>','\n\n')
                 .replaceAll('</p>','')
                 .replaceAll('<ul>','')
                 .replaceAll('</ul>','')
                 .replaceAll('<li>','*')
                 .replaceAll('</li>','\n')        
    }
}

module.exports = {formatData}
