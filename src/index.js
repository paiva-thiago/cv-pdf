const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const PDFDocument = require('pdfkit');
const extraFonts = require('./extrafonts')
const themes = require('./themes')
const requestLoader = require('./requestloader')

const app = new Koa();
const router = new Router();
const PORT = 8081;

// Apply body parser middleware
app.use(bodyParser());

// Simple POST route
router.post('/api/cv', async (ctx) => {
  try {
  
  const  jsonData  = ctx.request.body;
  console.log(jsonData.headerData)
  if (!jsonData || Object.keys(jsonData).length === 0) {
    ctx.status = 400;
    ctx.body = { error: 'No JSON data provided' };
    return;
  }
  requestLoader.formatData(jsonData.jobs)

    const doc = new PDFDocument();
    extraFonts.init(doc)
    const theme = themes.load(jsonData.theme)
    if(!theme){
      ctx.status=404
      ctx.body={error: 'Theme not found.'}
      return
    }
    ctx.set('Content-Type', 'application/pdf');
    ctx.set('Content-Disposition', 'attachment; filename=cv.pdf');
    
    ctx.body = doc;
    
    let header = jsonData.headerData

    // Add content to PDF
    doc.font(theme.headerFont).fontSize(theme.headerSize).text(header.name, { align: theme.headerAlign });
    doc.moveDown(0.15);
    
    doc.font(theme.headerFont).fontSize(theme.headerSize-2).text(header.occupation, { align: theme.headerAlign });
    doc.moveDown(0.3);

    doc.font(theme.textFont).fontSize(theme.headerSize-3).text(header.email, { align: theme.headerDataAlign });
    doc.font(theme.textFont).fontSize(theme.headerSize-3).text('https://linkedin.com/in/'+header.linkedin, { align: theme.headerDataAlign });
    
    doc.moveDown(1);

    doc.moveTo(50, doc.y)      // Start point (x, y)
       .lineTo(550, doc.y)     // End point (x, y)
       .stroke();    
    doc.moveDown(2);

    
    doc.font(theme.headerFont).fontSize(theme.ndHeaderSize).text('Professional Timeline');
    doc.moveDown(0.5);
    
    for(let job of jsonData.jobs){
      doc.font(theme.headerFont).fontSize(theme.rdHeaderSize).text(job.title)
      doc.moveDown(0.3)
      doc.font(theme.textFont).fontSize(theme.textSize).text(job.from+' - '+job.to)
      doc.moveDown(0.3)
      doc.font(theme.textFont).fontSize(theme.textSize).text(job.company+' - '+job.location)
      doc.moveDown(0.3)
      doc.font(theme.textFont).fontSize(theme.textSize).text(job.txt)
      doc.moveDown(2)
    }

    doc.end()
  } catch (error) {
    console.error('PDF generation error:', error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to generate PDF' };
  }

});

// Apply routes
app.use(router.routes()).use(router.allowedMethods());

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});