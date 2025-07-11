import React, { Component } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Table,
  Input,
  Form,
  FormGroup,
  Label,
  FormFeedback,
  FormText,
} from "reactstrap";
import "./home.sass";
import Blockchain from "./blockchain/Blockchain";
import Transaction from "./blockchain/Transaction";

class Home extends Component {
  constructor(props) {
    super(props);
    let bc = new Blockchain(2);
    this.state = {
      blockchain: bc,
      currentBlock: 0,
      inputDifficulty: bc.difficulty,
      inputAmount: 0,
      inputSender: "",
      inputReceiver: "",
      inputReward: bc.miningReward,
    };
  }

  newBlockchain = () => {
    this.setState({
      blockchain: new Blockchain(this.state.blockchain.difficulty),
    });
    this.setState({ currentBlock: 0 });
  };

  mineBlock = () => {
    this.state.blockchain.mineBlock("miner-address");
    this.setState({
      blockchain: this.state.blockchain,
    });
  };

  changeDifficulty = (e) => {
    e.preventDefault();
    if (this.state.inputDifficulty > 0 && this.state.inputDifficulty <= 5) {
      let blockchain = this.state.blockchain;
      blockchain.difficulty = parseInt(this.state.inputDifficulty);
      this.setState({ blockchain });
    }
  };

  isChainValid = () => {
    if (
      this.state.blockchain.chain.length <= 1 ||
      this.state.blockchain.isChainValid()
    ) {
      return <span className="text-success">Valid Chain</span>;
    } else {
      return <span className="text-success">Invalid Chain</span>;
    }
  };

  addTransaction = (e) => {
    e.preventDefault();
    this.state.blockchain.addTransaction(
      new Transaction(
        this.state.inputSender,
        this.state.inputReceiver,
        this.state.inputAmount
      )
    );
    this.setState({ blockchain: this.state.blockchain });
  };

  changeReward = (e) => {
    e.preventDefault();
    let blockchain = this.state.blockchain;
    blockchain.miningReward = this.state.inputReward;
    this.setState({ blockchain });
  };

  render() {
    return (
      <div className="home-content pt-4">
        <Container>
          <Row>
            <Col xs="12" md="6">
              <div className="bc-area mb-3 p-3">
                <div className="pb-2">
                  <Form onSubmit={(e) => this.addTransaction(e)}>
                    <span>Add Transfer</span>
                    <FormGroup>
                      <Label for="difficulty">Account A</Label>
                      <Input
                        type="text"
                        required
                        onChange={(e) =>
                          this.setState({ inputSender: e.target.value })
                        }
                        value={this.state.inputSender}
                      />
                      <FormFeedback>Invalid Value</FormFeedback>
                      <FormText>Sender account ID.</FormText>
                    </FormGroup>
                    <FormGroup>
                      <Label for="difficulty">Account B</Label>
                      <Input
                        type="text"
                        required
                        onChange={(e) =>
                          this.setState({ inputReceiver: e.target.value })
                        }
                        value={this.state.inputReceiver}
                      />
                      <FormFeedback>Invalid Value</FormFeedback>
                      <FormText>Receiver Account ID.</FormText>
                    </FormGroup>
                    <FormGroup>
                      <Label for="difficulty">Value</Label>
                      <Input
                        min={0}
                        type="number"
                        step="1"
                        onChange={(e) =>
                          this.setState({ inputAmount: e.target.value })
                        }
                        value={this.state.inputAmount}
                      />
                      <FormFeedback>Invalid Value</FormFeedback>
                      <FormText>Transfer Amount.</FormText>
                    </FormGroup>
                    <Button color="primary" type="submit">
                      Add
                    </Button>
                  </Form>
                </div>
              </div>
            </Col>
            <Col xs="12" md="6">
              <div className="bc-area mb-3 p-3 table-responsive">
                <span>Pending Transfers</span>
                <Table>
                  <thead>
                    <tr>
                      <th>Sender</th>
                      <th>Receiver</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.blockchain.pendingTransactions.map(
                      (item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.fromAddress}</td>
                            <td>{item.toAddress}</td>
                            <td>{item.amount}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </Table>
              </div>
              <div className="bc-area mb-3 p-3">
                <Row>
                  <Col xs="12">
                    <div className="pb-2 mb-2 border-bottom">
                      <Form onSubmit={(e) => this.changeDifficulty(e)}>
                        <FormGroup>
                          <Label for="difficulty">Difficulty</Label>
                          <Input
                            min={1}
                            max={5}
                            type="number"
                            step="1"
                            required
                            onChange={(e) =>
                              this.setState({ inputDifficulty: e.target.value })
                            }
                            value={this.state.inputDifficulty}
                          />
                          <FormFeedback>Invalid Value</FormFeedback>
                          <FormText>
                            Number of zeroes in front of the hash for each mined
                            block (using more than 3 might crash the app).
                          </FormText>
                        </FormGroup>
                        <Button color="primary" type="submit">
                          Update
                        </Button>
                      </Form>
                    </div>
                    <div className="pb-2 mb-2 border-bottom">
                      <Form onSubmit={(e) => this.changeReward(e)}>
                        <FormGroup>
                          <Label for="reward">Reward</Label>
                          <Input
                            min={0}
                            type="number"
                            step="1"
                            required
                            onChange={(e) =>
                              this.setState({ inputReward: e.target.value })
                            }
                            value={this.state.inputReward}
                          />
                          <FormFeedback>Invalid Value</FormFeedback>
                          <FormText>
                            Reward received by the block miner.
                          </FormText>
                        </FormGroup>
                        <Button color="primary" type="submit">
                          Update
                        </Button>
                      </Form>
                    </div>
                  </Col>
                  <Col xs="6" md="4">
                    <Button
                      color="primary"
                      onClick={() => this.newBlockchain()}
                    >
                      Reset
                    </Button>
                  </Col>
                  <Col xs="6" md="4">
                    <Button color="primary" onClick={() => this.mineBlock()}>
                      Mine
                    </Button>
                  </Col>
                  <Col xs="6" md="4">
                    {this.isChainValid()}
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs="12">
              <div className="bc-area mb-3 p-3">
                <Row>
                  {this.state.blockchain.chain.map((item, index) => {
                    return (
                      <Col xs="4" md="2" lg="1" key={index}>
                        <div
                          className={
                            "py-3 mb-3 text-center " +
                            (index === this.state.currentBlock
                              ? "bc-block-selected"
                              : "bc-block")
                          }
                          onClick={() => this.setState({ currentBlock: index })}
                        >
                          <span className="text-white">{index}</span>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Col>
            <Col xs="12">
              <div className="bc-area mb-3 p-3 table-responsive">
                <Table>
                  <tbody>
                    <tr>
                      <td>Timestamp</td>
                      <td>
                        {this.state.blockchain.chain[
                          this.state.currentBlock
                        ].timestamp.toString()}
                      </td>
                    </tr>
                    <tr>
                      <td>Data</td>
                      <td>
                        {JSON.stringify(
                          this.state.blockchain.chain[this.state.currentBlock]
                            .transactions
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Previous Hash</td>
                      <td>
                        {this.state.blockchain.chain[
                          this.state.currentBlock
                        ].previousHash.toString()}
                      </td>
                    </tr>
                    <tr>
                      <td>Hash</td>
                      <td>
                        {this.state.blockchain.chain[
                          this.state.currentBlock
                        ].hash.toString()}
                      </td>
                    </tr>
                    <tr>
                      <td>Nonce</td>
                      <td>
                        {
                          this.state.blockchain.chain[this.state.currentBlock]
                            .nonce
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Difficulty</td>
                      <td>
                        {
                          this.state.blockchain.chain[this.state.currentBlock]
                            .difficulty
                        }
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
