import React from 'react'
import Header from "./Header";

function Team() {
  return ( <><Header/>
  <h1 style={{fontSize:'40px', margin:'10px'}}>Meet The Team</h1>
  <div class="row">
    <div class="column" style={{alignItems: 'center', justifyContent: 'center'}}>
      <div class="card">
        <img src={require("./assets/Thomas.jpeg")} alt="Thomas Pic" style={{borderRadius: "50%", width:'50%', background: 'red', display: 'block'}}/>
        <div class="container">
          <h2>Thomas Chilton</h2>
          <p class="title">Software Developer</p>
          <p hidden>Some text that describes me lorem ipsum ipsum lorem.</p>
          <p><form action = "https://www.linkedin.com/in/thomaschilton-cs/">
                <input type="submit" class="button" value="LinkedIn"/>
              </form>
                </p>
        </div>
      </div>
    </div>

    <div class="column">
      <div class="card">
        <img src={require("./assets/Heman.jpeg")} alt="Heman Pic" style={{borderRadius: "50%", width:'50%', background: 'red', display: 'block'}}/>
        <div class="container">
          <h2>Heman Sran</h2>
          <p class="title">Software Developer</p>
          <p hidden>Some text that describes me lorem ipsum ipsum lorem.</p>
          <p><form action = "https://www.linkedin.com/in/hemansran/">
                <input type="submit" class="button" value="LinkedIn"/>
              </form>
                </p>
        </div>
      </div>
    </div>

    <div class="column">
      <div class="card">
        <img src={require("./assets/Pranav.jpg")} alt="Pranav Pic" style={{borderRadius: "50%", width:'50%', background: 'red', display: 'block'}}/>
        <div class="container">
          <h2>Pranav Annapareddi</h2>
          <p class="title">Software Developer</p>
          <p hidden>Some text that describes me lorem ipsum ipsum lorem.</p>
          <p><form action = "https://www.linkedin.com/in/pranav-annapareddi-50083a149/">
                <input type="submit" class="button" value="LinkedIn"/>
              </form>
                </p>
        </div>
      </div>
    </div>
</div>
<style dangerouslySetInnerHTML={{ 
  __html: `/* Three columns side by side */
          .column {
              float: left;
              width: 33.3%;
              margin-bottom: 16px;
              padding: 0 8px;
            }
            
            /* Display the columns below each other instead of side by side on small screens */
            @media screen and (max-width: 650px) {
              .column {
                width: 100%;
                display: block;
              }
            }
            
            /* Add some shadows to create a card effect */
            .card {
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            }
            
            /* Some left and right padding inside the container */
            .container {
              padding: 0 16px;
            }
            
            /* Clear floats */
            .container::after, .row::after {
              content: "";
              clear: both;
              display: table;
            }

            
            .title {
              color: grey;
            }
            
            .button {
              border: none;
              outline: 0;
              display: inline-block;
              padding: 8px;
              color: white;
              background-color: #0997CB;
              text-align: center;
              cursor: pointer;
              width: 50%;
            }
            
            .button:hover {
              background-color: #555;
            }`
}} /> </>);
}
export default Team