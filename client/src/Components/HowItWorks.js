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
            model we predict stock data using Google Trends data for "Coronavirus" and "Electric Vehicle".
        </p>
        <h2 style={{fontWeight:'bold'}}>Technique:</h2>
        <p style={{margin:'15px'}}>Here I'll talk about things like Bayesian Optimization, stacking the model, data preparation, etc.</p>
        <h2 style={{fontWeight:'bold'}}>Delivery:</h2>
        <p style={{margin:'15px'}}>Here I'll talk about fetching data with the two APIs, caching of Google Trends data, React and Flask, etc.</p>
        </>
    )
}

export default HowItWorks