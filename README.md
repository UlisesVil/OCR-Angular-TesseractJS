# OCR-Angular-TesseractJS
# Optical Character Recognition App in Angular

This fully Responsive application is available on the web, built-in Angular on the Frontend, and communicates with a Node JS REST-API, deployed on Heroku on the backend. The database comes from Mongo DB Atlas.
The principal function of this application is the recognition of characters contained in an image using the Tesseract JS library. The user can obtain the text and use it as required.
This application has two modes, Quick OCR and Full OCR.
Quick ocr mode allows the user to extract the text from the image without saving it to the AWS S3 service and without logging in. user cannot save images in this mode.
The Full OCR mode requires the user to register and log in. The users will be able to save their images with a name and short description. the images will be saved in the AWS S3 service and the database and will be available for the user when login.

Visit the site here: https://ulisesvil.github.io/OCR-Angular-TesseractJS
