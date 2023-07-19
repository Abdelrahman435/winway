const util = require("util");
const fs = require("fs");

async function update(req, res) {
    try {
      const errors = req.validationErrors();
      if (!errors) {
        return res.status(400).json({ errors: "error" });
      }
  
      const profile = await getUserById(req.params.id);
      if (!profile[0]) {
        return res.status(404).json({ errors: ["User not found"] });
      }
  
      const profileObj = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
      };
  
      if (req.file) {
        courseObj.image = req.file.filename;
        if (course && course.image) {
          fs.unlinkSync("../upload/" + course[0].image);
        }
      }
  
      await updateCourse(course[0].id, courseObj);
  
      res.status(200).json({
        msg: "Course updated",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }