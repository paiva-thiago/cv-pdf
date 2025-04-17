const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const PDFDocument = require('pdfkit');


const app = new Koa();
const router = new Router();
const PORT = 8081;

// Apply body parser middleware
app.use(bodyParser());

// Simple POST route
router.post('/api/cv', async (ctx) => {
  try {
  
  const  jsonData  = ctx.request.body;
  console.log(jsonData)
  if (!jsonData || Object.keys(jsonData).length === 0) {
    ctx.status = 400;
    ctx.body = { error: 'No JSON data provided' };
    return;
  }

    const doc = new PDFDocument();

    
    // Set response headers
    ctx.set('Content-Type', 'application/pdf');
    ctx.set('Content-Disposition', 'attachment; filename=cv.pdf');
    
    // Pipe PDF directly to Koa response
    ctx.body = doc;
    
    let header = jsonData.headerData

    // Add content to PDF
    doc.fontSize(25).text(header.name, { align: 'left' });
    doc.moveDown(1);
    
    doc.fontSize(20).text(header.occupation, { align: 'left' });
    doc.moveDown(1);

    doc.fontSize(20).text(header.email, { align: 'left' });
    doc.moveDown(1);

    doc.moveTo(50, doc.y)      // Start point (x, y)
   .lineTo(550, doc.y)     // End point (x, y)
   .stroke();    

    // Add section headers
    doc.fontSize(16).fillColor('navy').text('Professional Timeline');
    doc.moveDown(0.5);
    

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