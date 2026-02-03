from langgraph.graph.state import StateGraph,START,END
from src.graph.nodes import Nodes
from src.graph.state import ChatState


class Agent:
    def __init__(self,llm):
        self.app = None
        self.llm = llm
        self.nodes = Nodes()


    def build_graph(self):
        workflow = StateGraph(ChatState)
 
        workflow.add_node("retriever", self.nodes.retriever)
        workflow.add_node("agent", self.nodes.agent)

        workflow.add_edge(START,"retriever")
        workflow.add_edge("retriever","agent")
        workflow.add_edge("agent",END)

        app = workflow.compile()
        return app
    
    def __call__(self):
        return self.build_graph()

