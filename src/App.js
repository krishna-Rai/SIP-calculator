import { Container, Col, Form, Button, Row } from "react-bootstrap";
import { useState,useEffect } from "react";
import PieChart from './PieChart'
function App() {
  
  const [state,setState] = useState({
    isSIP:true,
    perMonth:5000,
    rateOfReturn:10,
    time:10,
    investedAmt:0,
    estReturns:0,
    totalValue:0
  })
  const setOutputValues=({investedAmt,monthlyRate,totalValue,estReturns})=>{
    setState((prev) => {
      return {
        ...prev,
        investedAmt,
        estReturns,
        totalValue,
      };
    });
  }
  useEffect(()=>{

    // FV = P × ((1 + i)^n - 1) / i) × (1 + i)
    
    const investedAmt = state.isSIP ? Math.trunc(state.perMonth*12*state.time) : state.perMonth
    const monthlyRate = state.rateOfReturn/12/100
    const totalValue = state.isSIP ? (Math.trunc(state.perMonth*((Math.pow((1+monthlyRate),state.time*12)-1)/monthlyRate)*(1+monthlyRate))) : Math.trunc(state.perMonth*(Math.pow(1+state.rateOfReturn/100,state.time)))
    console.log(totalValue)
    const estReturns = Math.trunc(totalValue-investedAmt)
    setOutputValues({
      investedAmt,
      monthlyRate,
      totalValue,
      estReturns
    })
    
    
  },[state.perMonth,state.rateOfReturn,state.time,state.isSIP])
  const handleChange=(e)=>{
    const name = e.target.name
    const value = e.target.value
    console.log(name+" "+value)
    setState((prev)=>{
      return {
        ...prev,
        [name]:value
      }
    })
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col sm={1}></Col>
        <Col sm={10}>
          <Container>
            <h1 style={{textAlign:"center"}} className="mb-4">SIP Calculator</h1>
            <Row>
              <Col>
                <Form>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Check
                        defaultChecked
                        type="radio"
                        label="SIP"
                        name="sip-lumpsum"
                        id="sip"
                        onClick={() =>
                          setState((prev) => ({ ...prev, isSIP: true }))
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Check
                        className="lg"
                        type="radio"
                        label="LumpSum"
                        name="sip-lumpsum"
                        id="lump-sum"
                        onClick={() =>
                          setState((prev) => ({ ...prev, isSIP: false }))
                        }
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Group controlId="formBasicRangeCustom">
                    {state.isSIP ? (
                      <Form.Label>Monthly Investment</Form.Label>
                    ) : (
                      <Form.Label>Total Investment</Form.Label>
                    )}
                    <Form.Control type="text" value={state.perMonth} readOnly />
                    <Form.Control
                      type="range"
                      custom
                      name="perMonth"
                      min="0"
                      max="100000"
                      step="1000"
                      value={state.perMonth}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicRangeCustom">
                    <Form.Label>Expected Return Rate</Form.Label>
                    <Form.Control
                      type="text"
                      value={state.rateOfReturn}
                      readOnly
                    />
                    <Form.Control
                      type="range"
                      custom
                      name="rateOfReturn"
                      min="1"
                      max="40"
                      value={state.rateOfReturn}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicRangeCustom">
                    <Form.Label>Time Period</Form.Label>
                    <Form.Control type="text" value={state.time} readOnly />
                    <Form.Control
                      type="range"
                      custom
                      name="time"
                      min="1"
                      max="40"
                      value={state.time}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridInvested">
                      <Form.Label>Invested Amount</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={state.investedAmt}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEstReturns">
                      <Form.Label>Est. Returns</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={state.estReturns}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Group controlId="formGridTotalReturns">
                    <Form.Label>Total Value</Form.Label>
                    <Form.Control
                      type="text"
                      readOnly
                      value={state.totalValue}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col>
                <PieChart
                  investedAmt={state.investedAmt}
                  estReturns={state.estReturns}
                />
              </Col>
            </Row>
          </Container>
        </Col>
        <Col sm={1}></Col>
      </Row>
    </Container>
  );
}

export default App;
