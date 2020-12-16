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
                    <span style={{ marginLeft: 400 }}>
                  <a href="https://github.com/krishna-Rai/SIP-calculator" style={{color:"grey"}}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="currentColor"
                      class="bi bi-github"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                      />
                    </svg>
                  </a>
                </span>
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
