const handleHttpError =(res,messague= "Algo sucedio",code=403)=>{
    res.status(code);
    res.send({error:messague})
}

module.exports={handleHttpError};