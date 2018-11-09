#!/usr/bin/python
# CS 6250 Fall 2018 - Project 6 - SDN Firewall

from pyretic.lib.corelib import *
from pyretic.lib.std import *
from pyretic.lib.query import packets
from pyretic.core import packet 
from collections import namedtuple

def make_firewall_policy(config):

    # You may place any user-defined functions in this space.
    # You are not required to use this space - it is available if needed.

    # feel free to remove the following "print config" line once you no longer need it
	print config # for demonstration purposes only, so you can see the format of the config
    
 	# TODO - This is where you build your firewall rules...
        # Note that you will need to delete the first rule line below when you create your own
        # firewall rules.  Refer to the Pyretic github documentation for instructions on how to
        # format these commands.
        # Example (but incomplete)
        # rule = match(srcport = int(entry['port_src']))
        # The line below is hardcoded to match TCP Port 1080.  You must remove this line
        # in your completed assignments.

	rules = []

	firewall_policy=make_firewall_dict(config)

	for policy_rule in firewall_policy.values():
		print(policy_rule)
		rule= process_firewall_rule(policy_rule)
		rules.append(rule)
		pass
	
	flat_rulelist = [rule for rule_sublist in rules for rule in rule_sublist]
	allowed = ~(union(flat_rulelist))
	return allowed

def make_firewall_dict(config):
	# Create dict of firewall policy
	Policy_Rule= namedtuple('Policy_Rule', ('srcmac', 'dstmac','srcip','dstip','srcport','dstport', 'protocol'))
	policy_dict = {}
	for entry in config:
		policy_dict[entry['rulenum']] = Policy_Rule(entry['macaddr_src'], entry['macaddr_dst'], entry['ipaddr_src'], entry['ipaddr_dst'],
                                                entry['port_src'], entry['port_dst'], entry['protocol'])
	return policy_dict



def block(policy_rule):
	if(policy_rule.srcmac == '-' and policy_rule.dstmac== '-' and policy_rule.srcip== '-' and policy_rule.dstip == '-' and policy_rule.srcport== '-' and policy_rule.dstport == '-' and policy_rule.protocol== '-'):
		return True
	else:
		return False


def process_firewall_rule(policy_rule):
	rules=[]
	#check protocol
	if policy_rule.protocol=='T':
		rule= match(ethtype=packet.IPV4, protocol= packet.TCP_PROTO)
		rules.append(process_firewall_helper(policy_rule,rule))

	elif policy_rule.protocol=='U':
		rule= match(ethtype=packet.IPV4,protocol= packet.UDP_PROTO)
		rules.append(process_firewall_helper(policy_rule,rule))

	elif policy_rule.protocol=='I':
		rule= match(ethtype=packet.IPV4,protocol= packet.ICMP_PROTO)
		rules.append(process_firewall_helper(policy_rule,rule))

	elif policy_rule.protocol=='B':
		rule1= match(ethtype=packet.IPV4,protocol= packet.TCP_PROTO) 
		rule2= match(ethtype=packet.IPV4, protocol= packet.UDP_PROTO)
		rules.append(process_firewall_helper(policy_rule,rule1))
		rules.append(process_firewall_helper(policy_rule,rule2))
	
	return rules

def process_firewall_helper(policy_rule, rule):
	if (block(policy_rule) == true):
		print "Blocking everything"
		rule = match(ethtype=packet.IPV4, protocol=packet.TCP_PROTO)

	else:  
		#Check srcmac and dstmac
		if ((policy_rule.srcmac != '-') and (policy_rule.dstmac != '-')):
			rule = match(srcmac = EthAddr(policy_rule.srcmac), dstmac = EthAddr(policy_rule.dstmac))
		elif (policy_rule.srcmac != '-'):
			rule = match(srcmac = EthAddr(policy_rule.srcmac))
		elif (policy_rule.dstmac != '-'):
			rule = match(dstmac = EthAddr(policy_rule.dstmac))

		#Check dstport & srcport
		if (policy_rule.srcport != '-'):
			rule = rule & match(srcport = int(policy_rule.srcport))
		if (policy_rule.dstport != '-'):
			rule = rule & match(dstport = int(policy_rule.dstport))
		
		#Check srcip and dstip
		if ((policy_rule.srcip != '-') and (policy_rule.dstip != '-')):
			rule = rule & match(srcip = IPAddr(policy_rule.srcip), dstip=IPAddr(policy_rule.dstip))
		elif (policy_rule.srcip != '-'):
			rule = rule & match(dstip = IPAddr(policy_rule.srcip))
		elif (policy_rule.dstip != '-'):
			rule = rule & match(dstip = IPAddr(policy_rule.dstip))
		
	
	return rule


