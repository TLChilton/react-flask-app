import React from 'react'
import Header from "./Header";

function HowItWorks() {
    return (
        <>
        <Header/>
        <h1 style={{fontSize:'40px', margin:'10px'}}>How it Works</h1>
        <h2 style={{fontWeight:'bold'}}>Design:</h2>
        <p style={{margin:'15px'}}>
            Our prediction is done using a Long Short-Term Memory (LSTM) Recurrent Neural Network (RNN) Architecture. 
            Neural networks are a popular computing system in the field of machine learning. At their core they are networks 
            of artificial neurons. Each of these neurons takes an input, transforms that input using a combination of a set of 
            weights and a transformation function, and turns that into an output. During the training phase the neural network 
            adjusts these weights and sees if that makes its output closer to its expected value. This is how it learns, and the 
            result of a neural network is a model that can take an input, apply it to the learned function, and get an output that 
            should be close to whats expected.
        </p>
        <p style={{margin:'15px'}}>
            The stated goal then of our project was to create such a model for a specific type of data. That data being time series. 
            We were tasked with finding some time series data available on the Internet and make a model that can predict the future 
            values of that data set using a multivariate model. By multivariate we mean that the model should take multiple inputs to 
            reach its output. We settled on predicting stock data since its a dataset that is freely available on the internet in abundance.
            As supporting features for the model we eventually ended up using Google Trends data for a similar reason. Thus in our current 
            model we predict stock data using Google Trends data for "Coronavirus" and "Electric Vehicle". In theory this makes our model 
            particularly trained for vehicle manufacturers and time periods where Coronavirus is relevant.
        </p>
        <h2 style={{fontWeight:'bold'}}>Technique:</h2>
        <p style={{margin:'15px'}}>
            During the process of training our model we tried several different techniques for improving our results. One of these being 
            Bayesian Optimization, which is a technique for optimizing the output of black-box functions. It does this by adjusting the 
            parameters that go into the function to see how those parameters affect output, and it will train towards optimal parameters. 
            In our case we optimized for the number of input timesteps, the learning rate, the number of layer neurons, the number of LSTM 
            layers, dropout rate, batch size, patience of our early stopping function, and number of training epochs.
        </p>
        <h2 style={{fontWeight:'bold'}}>Delivery:</h2>
        <p style={{margin:'15px'}}>
            For the delivery of our model we decided on the React app you are seeing right now. The front end of this app uses ReactJS, and 
            the backend is using the Flask python REST API library. The operation of the model (found on the home page) takes the inputed stock 
            ticker and start date and uses that to download the 206 days worth of stock and Google Trends data input required by our model. We use 
            pandas_datareader for downloading the stock data and pytrends for downloading the Google Trends data. Since the Google Trends data takes 
            longer to download, we set up a local cache of Google Trends data and compare the requested date to what exists in the cache, and if possible 
            we use data from the cache in order to limit the necessary API calls.
        </p>
        </>
    )
}

export default HowItWorks