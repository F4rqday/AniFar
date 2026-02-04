// just creating base structure for resourceController.js

exports.create = async (req,res) => {res.status(200).json({message:'create resource'});};
exports.getAll = async (req,res) => {res.status(200).json({message:'get all resources'});};
exports.getbyId = async (req,res) => {res.status(200).json({message:'get resource by id'});};
exports.update = async (req,res) => {res.status(200).json({message:'update resource'});};
exports.delete = async (req,res) => {res.status(200).json({message:'delete resource'});};
