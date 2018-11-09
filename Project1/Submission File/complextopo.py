from mininet.topo import Topo
from mininet.net import Mininet
from mininet.link import TCLink
from mininet.util import custom
																			
# Topology to be instantiated in Mininet
class ComplexTopo(Topo):
    "Mininet Complex Topology"

    def __init__(self, cpu=.1, max_queue_size=None, **params):

        # Initialize topo
        Topo.__init__(self, **params)

        #TODO: Create your Mininet Topology here!

	#Configurations
	hostConfig={'cpu': cpu}
	ethernetConfig= {'bw': 25, 'delay': '2ms', 'loss': 0}
	wifiConfig={'bw': 10, 'delay': '6ms', 'loss': 3}
	threegConfig={'bw': 3, 'delay': '10ms', 'loss': 8}

	#Hosts
	h1 = self.addHost('h1', **hostConfig)
	h2 = self.addHost('h2', **hostConfig)
	h3 = self.addHost('h3', **hostConfig)
	
	#Switches
	s1 = self.addSwitch('s1')
	s2 = self.addSwitch('s2')
	s3 = self.addSwitch('s3')
	s4 = self.addSwitch('s4')

	#Wire Hosts
	self.addLink(h1,s1, **ethernetConfig)
	self.addLink(h2,s3, **wifiConfig)
	self.addLink(h3,s4, **threegConfig)

	#Wire Switches
	self.addLink(s1,s2, **ethernetConfig)
        self.addLink(s2,s3, **ethernetConfig)
        self.addLink(s2,s4, **ethernetConfig)






