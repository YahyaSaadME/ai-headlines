require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const path = require("path")
const generator = require("./generator.js")
// const  llamagenerator = require("./llamagenerator.js")
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get("/history", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/history.html'));
})

app.post("/generate", async (req, res) => {
  try {
    const { text, platform, toGenerate } = req.body;
    const result = await generator(text, platform, toGenerate)
    res.json({ res: result.response.text() })

    // let resp = `## Oneplus Nord CE 3 Lite: 10 YouTube Headlines 

    // 1. **OnePlus Nord CE 3 Lite: Is This Budget King REALLY Worth It?** (Focus on value proposition)
    // 2. **OnePlus Nord CE 3 Lite: Hands-on Review! (Camera, Performance, Battery)** (Highlights key features)
    // 3. **OnePlus Nord CE 3 Lite vs. [Competitor]: Which Budget Phone Wins?** (Comparative review)
    // 4. **OnePlus Nord CE 3 Lite: 5 Reasons Why You Should Buy It!** (Emphasizes strengths)
    // 5. **OnePlus Nord CE 3 Lite: Everything You Need To Know! (Unboxing & First Look)** (Comprehensive overview)
    // 6. **OnePlus Nord CE 3 Lite: Is This The Perfect Phone For [Target Audience]?** (Targeted appeal)
    // 7. **OnePlus Nord CE 3 Lite: The Camera You Didn't Expect! (Photo & Video Test)** (Focus on camera capabilities)
    // 8. **OnePlus Nord CE 3 Lite: Gaming Beast On A Budget? (Performance Review)** (Highlights gaming performance)
    // 9. **OnePlus Nord CE 3 Lite: Long-Lasting Battery Life? (Battery Test)** (Focus on battery longevity)
    // 10. **OnePlus Nord CE 3 Lite: The Affordable Phone That Doesn't Compromise!** (Emphasizes overall value) `
    // resp = `##  Oneplus Nord CE 3 Lite:  Your Perfect Everyday Phone 📱

    // **Tired of your phone feeling slow and outdated?**  

    // **Upgrade to the Oneplus Nord CE 3 Lite!**  

    // 🌟 **Blazing Fast Performance:**  Fly through your apps and games with ease thanks to the powerful Snapdragon 695 processor.

    // 📸 **Stunning Camera:** Capture incredible memories with the 108MP main camera and unleash your creativity with a variety of shooting modes.

    // 🔋 **Long-Lasting Battery:** Enjoy all-day power and stay connected without worrying about charging.

    // ✨ **Sleek & Stylish Design:**  The Nord CE 3 Lite is a head-turner with its modern design and vibrant colors.

    // **Don't miss out on this incredible phone!**

    // **Get yours today and experience the Nord CE 3 Lite difference!**

    // **➡️ Click here to learn more: [Link to Product Page]**`
    //     res.json({res:resp})
  } catch (error) {
    res.json({ res: "Something went wrong!" })

  }
})

app.post("/llama",(req,res)=>{
  // llamagenerator()
  res.json({data:"sent"})
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
