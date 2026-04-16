import React, { useState, useEffect } from 'react'
import {
  BookOpen,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Hash,
  Home,
  Trophy,
} from 'lucide-react'

// --- DATA MERGING SECTION ---
// Combining all provided JSON data into a single constant.
// Filtered out "look at pdf" simulation questions that lack options.

const RAW_DATA = [
  // ... 151-200
  {
    id: 151,
    type: 'multiple_choice',
    question_text:
      'Which of the following is designed to distribute network traffic among devices based on the quantity of traffic?',
    options: [
      { letter: 'A', text: 'Load balancer' },
      { letter: 'B', text: 'Router' },
      { letter: 'C', text: 'Proxy' },
      { letter: 'D', text: 'Switch' },
    ],
    correct_answer: 'A',
  },
  {
    id: 152,
    type: 'multiple_choice',
    question_text:
      'A user recently moved a workstation to a different part of the office. The user is able to access the internet and print but is unable to access server resources. Which of the following is the most likely cause of the issue?',
    options: [
      { letter: 'A', text: 'Incorrect default gateway' },
      { letter: 'B', text: 'Wrong VLAN assignment' },
      { letter: 'C', text: 'Error-disabled port' },
      { letter: 'D', text: 'Duplicate IP address' },
    ],
    correct_answer: 'B',
  },
  {
    id: 153,
    type: 'multiple_choice',
    question_text:
      'A technician is planning an equipment installation into a rack in a data center that practices hot aisle/cold aisle ventilation. Which of the following directions should the equipment exhaust face when installed in the rack?',
    options: [
      { letter: 'A', text: 'Sides' },
      { letter: 'B', text: 'Top' },
      { letter: 'C', text: 'Front' },
      { letter: 'D', text: 'Rear' },
    ],
    correct_answer: 'D',
  },
  {
    id: 154,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to add 255 useable IP addresses to the network. A /24 is currently in use. Which of the following prefixes would fulfill this need?',
    options: [
      { letter: 'A', text: '/23' },
      { letter: 'B', text: '/25' },
      { letter: 'C', text: '/29' },
      { letter: 'D', text: '/32' },
    ],
    correct_answer: 'A',
  },
  {
    id: 155,
    type: 'multiple_choice',
    question_text:
      'Which of the following allows an organization to map multiple internal devices to a single external-facing IP address?',
    options: [
      { letter: 'A', text: 'NAT' },
      { letter: 'B', text: 'BGP' },
      { letter: 'C', text: 'OSPF' },
      { letter: 'D', text: 'FHRP' },
    ],
    correct_answer: 'A',
  },
  {
    id: 156,
    type: 'multiple_choice',
    question_text:
      'Which of the following steps in the troubleshooting methodology includes checking logs for recent changes?',
    options: [
      { letter: 'A', text: 'Identify the problem.' },
      { letter: 'B', text: 'Document the findings and outcomes.' },
      { letter: 'C', text: 'Test the theory to determine cause.' },
      { letter: 'D', text: 'Establish a plan of action.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 157,
    type: 'multiple_choice',
    question_text:
      'Which of the following configurations exempts traffic to the internet from traversing a VPN?',
    options: [
      { letter: 'A', text: 'Client-to-site' },
      { letter: 'B', text: 'Active-passive' },
      { letter: 'C', text: 'Split-tunnel' },
      { letter: 'D', text: 'Out-of-band' },
    ],
    correct_answer: 'C',
  },
  {
    id: 158,
    type: 'multiple_choice',
    question_text:
      'Which of the following ports creates a secure connection to a directory service?',
    options: [
      { letter: 'A', text: '22' },
      { letter: 'B', text: '389' },
      { letter: 'C', text: '445' },
      { letter: 'D', text: '636' },
    ],
    correct_answer: 'D',
  },
  {
    id: 159,
    type: 'multiple_choice',
    question_text:
      'A network engineer configures a new switch and connects it to an existing switch for expansion and redundancy. Users immediately lose connectivity to the network. The network engineer notes the following spanning tree information from both switches:\nSwitch 1: Port 1 (Forward, Cost 2), Port 2 (Forward, Cost 2)\nSwitch2: Port 1 (Forward, Cost 2), Port 2 (Forward, Cost 2)\nWhich of the following best describes the issue?',
    options: [
      { letter: 'A', text: 'The port cost should not be equal.' },
      { letter: 'B', text: 'The ports should use link aggregation.' },
      { letter: 'C', text: 'A root bridge needs to be identified.' },
      { letter: 'D', text: 'The switch should be configured for RSTP.' },
    ],
    correct_answer: 'C',
  },
  {
    id: 160,
    type: 'multiple_choice',
    question_text:
      'A network administrator is implementing security zones for each department. Which of the following should the administrator use to accomplish this task?',
    options: [
      { letter: 'A', text: 'ACLs' },
      { letter: 'B', text: 'Port security' },
      { letter: 'C', text: 'Content filtering' },
      { letter: 'D', text: 'NAC' },
    ],
    correct_answer: 'A',
  },
  {
    id: 161,
    type: 'multiple_choice',
    question_text:
      'Which of the following protocols is used to route traffic on the public internet?',
    options: [
      { letter: 'A', text: 'BGP' },
      { letter: 'B', text: 'OSPF' },
      { letter: 'C', text: 'EIGRP' },
      { letter: 'D', text: 'RIP' },
    ],
    correct_answer: 'A',
  },
  {
    id: 162,
    type: 'multiple_choice',
    question_text:
      'Which of the following protocols provides remote access utilizing port 22?',
    options: [
      { letter: 'A', text: 'SSH' },
      { letter: 'B', text: 'Telnet' },
      { letter: 'C', text: 'TLS' },
      { letter: 'D', text: 'RDP' },
    ],
    correct_answer: 'A',
  },
  {
    id: 163,
    type: 'multiple_choice',
    question_text:
      'After changes were made to a firewall, users are no longer able to access a web server. A network administrator wants to ensure that ports 80 and 443 on the web server are still accessible from the user IP space. Which of the following commands is best suited to perform this testing?',
    options: [
      { letter: 'A', text: 'dig' },
      { letter: 'B', text: 'ifconfig' },
      { letter: 'C', text: 'ping' },
      { letter: 'D', text: 'nmap' },
    ],
    correct_answer: 'D',
  },
  {
    id: 164,
    type: 'multiple_choice',
    question_text:
      'Which of the following attacks would most likely cause duplicate IP addresses in a network?',
    options: [
      { letter: 'A', text: 'Rogue DHCP server' },
      { letter: 'B', text: 'DNS poisoning' },
      { letter: 'C', text: 'Social engineering' },
      { letter: 'D', text: 'Denial-of-service' },
    ],
    correct_answer: 'A',
  },
  {
    id: 165,
    type: 'multiple_choice',
    question_text:
      "An organization wants better network visibility. The organization's requirements include:\n- Multivendor/OS-monitoring capabilities\n- Real-time collection\n- Data correlation\nWhich of the following meets these requirements?",
    options: [
      { letter: 'A', text: 'SNMP' },
      { letter: 'B', text: 'SIEM' },
      { letter: 'C', text: 'Nmap' },
      { letter: 'D', text: 'Syslog' },
    ],
    correct_answer: 'B',
  },
  {
    id: 166,
    type: 'multiple_choice',
    question_text:
      'An administrator is evaluating the use of authentication within SNMP. Which of the following is the most secure way of authenticating devices using only SNMP?',
    options: [
      {
        letter: 'A',
        text: 'Use version 1 of SNMP and use a community string to serve as a PSK',
      },
      {
        letter: 'B',
        text: 'Use version 3 of SNMP and set up trap messages for critical events on the network',
      },
      {
        letter: 'C',
        text: 'Use version 2c of SNMP and use informs to validate device authentication',
      },
      {
        letter: 'D',
        text: 'Use version 2u of SNMP to authenticate devices for network monitoring',
      },
    ],
    correct_answer: 'B',
  },
  {
    id: 167,
    type: 'multiple_choice',
    question_text:
      'A company has observed increased user traffic to gambling websites and would like to limit this behavior on work computers. Which of the following should the company most likely implement?',
    options: [
      { letter: 'A', text: 'ACLS' },
      { letter: 'B', text: 'Content filter' },
      { letter: 'C', text: 'Port security' },
      { letter: 'D', text: 'Screened subnet' },
    ],
    correct_answer: 'B',
  },
  {
    id: 168,
    type: 'multiple_choice',
    question_text:
      'Following a fire in a data center, the cabling was replaced. Soon after an administrator notices network issues. Which of the following are the most likely causes of the network issues? (Choose two.)',
    options: [
      { letter: 'A', text: 'The switches are not the correct voltage' },
      {
        letter: 'B',
        text: 'The HVAC system was not verified as fully functional after the fire',
      },
      {
        letter: 'C',
        text: 'The VLAN database was not deleted before the equipment was brought back online',
      },
      {
        letter: 'D',
        text: 'The RJ45 cables were replaced with unshielded cables',
      },
      {
        letter: 'E',
        text: 'The wrong transceiver type was used for the new termination',
      },
      {
        letter: 'F',
        text: 'The new RJ45 cables are a higher category than the old ones',
      },
    ],
    correct_answer: ['D', 'E'],
  },
  {
    id: 169,
    type: 'multiple_choice',
    question_text:
      'Cloud computing has the capability to meet increased and decreased demands for computing infrastructure for a short period of time. Which of the following best describes this characteristic?',
    options: [
      { letter: 'A', text: 'Efficiency' },
      { letter: 'B', text: 'Elasticity' },
      { letter: 'C', text: 'Multitenancy' },
      { letter: 'D', text: 'Scalability' },
    ],
    correct_answer: 'B',
  },
  {
    id: 170,
    type: 'multiple_choice',
    question_text:
      'Which of the following can also provide a security feature when implemented?',
    options: [
      { letter: 'A', text: 'NAT' },
      { letter: 'B', text: 'BGP' },
      { letter: 'C', text: 'FHRP' },
      { letter: 'D', text: 'EIGRP' },
    ],
    correct_answer: 'A',
  },
  {
    id: 171,
    type: 'multiple_choice',
    question_text:
      'Which of the following best describes the transmission format that occurs at the transport layer over connectionless communication?',
    options: [
      { letter: 'A', text: 'Datagram' },
      { letter: 'B', text: 'Segment' },
      { letter: 'C', text: 'Frames' },
      { letter: 'D', text: 'Packets' },
    ],
    correct_answer: 'A',
  },
  {
    id: 172,
    type: 'multiple_choice',
    question_text:
      'Which of the following is most likely to work with an FC connection and offers more scalability?',
    options: [
      { letter: 'A', text: 'DAS' },
      { letter: 'B', text: 'SAN' },
      { letter: 'C', text: 'SSE' },
      { letter: 'D', text: 'NAS' },
    ],
    correct_answer: 'B',
  },
  {
    id: 173,
    type: 'multiple_choice',
    question_text:
      'A company is moving to a hybrid cloud model. As part of this move the mail server will be moved to the cloud. The systems administrator needs to ensure the mail server continues to receive email. Which of the following types of DNS records should the systems administrator update?',
    options: [
      { letter: 'A', text: 'NS' },
      { letter: 'B', text: 'PTR' },
      { letter: 'C', text: 'MX' },
      { letter: 'D', text: 'A' },
    ],
    correct_answer: 'C',
  },
  {
    id: 174,
    type: 'multiple_choice',
    question_text:
      'A network engineer is configuring network ports in a public office. To increase security, the engineer wants the ports to allow network connections only after authentication. Which of the following security features should the engineer use?',
    options: [
      { letter: 'A', text: 'Port security' },
      { letter: 'B', text: '802.1X' },
      { letter: 'C', text: 'MAC filtering' },
      { letter: 'D', text: 'Access control list' },
    ],
    correct_answer: 'B',
  },
  {
    id: 175,
    type: 'multiple_choice',
    question_text:
      'A network administrator is expanding a network and wants to ensure no unauthorized redundant links are present. Which of the following should the administrator use to identify and block redundant links?',
    options: [
      { letter: 'A', text: 'SDN' },
      { letter: 'B', text: 'STP' },
      { letter: 'C', text: 'LLDP' },
      { letter: 'D', text: 'OSPF' },
    ],
    correct_answer: 'B',
  },
  {
    id: 176,
    type: 'multiple_choice',
    question_text:
      'A network administrator notices uncommon communication between VMs on ephemeral ports on the same subnet. The administrator is concerned about that traffic moving laterally within the network. Which of the following describes the type of traffic flow the administrator is analyzing?',
    options: [
      { letter: 'A', text: 'East-west' },
      { letter: 'B', text: 'Point-to-point' },
      { letter: 'C', text: 'Horizontal-scaling' },
      { letter: 'D', text: 'Hub-and-spoke' },
    ],
    correct_answer: 'A',
  },
  {
    id: 177,
    type: 'multiple_choice',
    question_text:
      "Which of the following would be violated if an employee accidentally deleted a customer's data?",
    options: [
      { letter: 'A', text: 'Integrity' },
      { letter: 'B', text: 'Confidentiality' },
      { letter: 'C', text: 'Vulnerability' },
      { letter: 'D', text: 'Availability' },
    ],
    correct_answer: 'D',
  },
  {
    id: 178,
    type: 'multiple_choice',
    question_text:
      'A network engineer is now in charge of all SNMP management in the organization. The engineer must use a SNMP version that does not utilize plaintext data. Which of the following is the minimum version of SNMP that supports this requirement?',
    options: [
      { letter: 'A', text: 'v1' },
      { letter: 'B', text: 'v2c' },
      { letter: 'C', text: 'v2u' },
      { letter: 'D', text: 'v3' },
    ],
    correct_answer: 'D',
  },
  {
    id: 179,
    type: 'multiple_choice',
    question_text:
      'A company recently acquired a number of sites and no documentation was provided. A network administrator needs to identify and document all of the digital assets in use. Which of the following is the best method for the administrator to use?',
    options: [
      { letter: 'A', text: 'Availability monitoring' },
      { letter: 'B', text: 'Packet capture' },
      { letter: 'C', text: 'Physical inventory' },
      { letter: 'D', text: 'Network discovery' },
    ],
    correct_answer: 'D',
  },
  {
    id: 180,
    type: 'multiple_choice',
    question_text:
      'A network administrator recently upgraded a wireless infrastructure with new APs. Users are reporting that, when stationary, the wireless connection drops and reconnects after 20 to 30 seconds. While reviewing the logs, the administrator notices that the APs are changing channels. Which of the following is the most likely reason for the service interruptions?',
    options: [
      { letter: 'A', text: 'Channel interference' },
      { letter: 'B', text: 'Roaming misconfiguration' },
      { letter: 'C', text: 'Network congestion' },
      { letter: 'D', text: 'Insufficient wireless coverage' },
    ],
    correct_answer: 'A',
  },
  {
    id: 181,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to set up a multicast network for audio and video broadcasting. Which of the following networks would be the most appropriate for this application?',
    options: [
      { letter: 'A', text: '172.16.0.0/24' },
      { letter: 'B', text: '192.168.0.0/24' },
      { letter: 'C', text: '224.0.0.0/24' },
      { letter: 'D', text: '240.0.0.0/24' },
    ],
    correct_answer: 'C',
  },
  {
    id: 182,
    type: 'multiple_choice',
    question_text:
      'A user connects to a corporate VPN via a web browser and is able to use TLS to access the internal financial system to input a time card. Which of the following best describes how the VPN is being used?',
    options: [
      { letter: 'A', text: 'Clientless' },
      { letter: 'B', text: 'Client-to-site' },
      { letter: 'C', text: 'Full tunnel' },
      { letter: 'D', text: 'Site-to-site' },
    ],
    correct_answer: 'A',
  },
  {
    id: 183,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to fail over services to an off-site environment. This process will take four weeks to become fully operational. Which of the following DR concepts does this describe?',
    options: [
      { letter: 'A', text: 'Hot site' },
      { letter: 'B', text: 'Warm site' },
      { letter: 'C', text: 'Cold site' },
      { letter: 'D', text: 'Active-active approach' },
    ],
    correct_answer: 'C',
  },
  {
    id: 184,
    type: 'multiple_choice',
    question_text:
      'A security analyst wants to control internet access based on site reputation and categorization. The analyst needs a solution that does not require traffic flow changes. Which of the following solutions would most likely meet these requirements?',
    options: [
      { letter: 'A', text: 'Proxy' },
      { letter: 'B', text: 'DNS filtering' },
      { letter: 'C', text: 'Router ACL' },
      { letter: 'D', text: 'Load balancer' },
    ],
    correct_answer: 'B',
  },
  {
    id: 185,
    type: 'multiple_choice',
    question_text:
      'A wireless technician wants to implement a technology that will allow user devices to automatically navigate to the best available frequency standard. Which of the following technologies should the technician use?',
    options: [
      { letter: 'A', text: 'Band steering' },
      { letter: 'B', text: 'Wireless LAN controller' },
      { letter: 'C', text: 'Directional antenna' },
      { letter: 'D', text: 'Autonomous access point' },
    ],
    correct_answer: 'A',
  },
  {
    id: 186,
    type: 'multiple_choice',
    question_text:
      'A user called the help desk after business hours to complain that files on a device are inaccessible and the wallpaper was changed. The network administrator thinks that this issue is an isolated incident, but the security analyst thinks the issue might be a ransomware attack. Which of the following troubleshooting steps should be taken first?',
    options: [
      { letter: 'A', text: 'Identify the problem.' },
      { letter: 'B', text: 'Establish a theory.' },
      { letter: 'C', text: 'Document findings.' },
      { letter: 'D', text: 'Create a plan of action.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 187,
    type: 'multiple_choice',
    question_text:
      'A data center interconnect using a VXLAN was recently implemented. A network engineer observes slow performance and fragmentation on the interconnect. Which of the following technologies will resolve the issue?',
    options: [
      { letter: 'A', text: '802.1Q tagging' },
      { letter: 'B', text: 'Spanning tree' },
      { letter: 'C', text: 'Link aggregation' },
      { letter: 'D', text: 'Jumbo frames' },
    ],
    correct_answer: 'D',
  },
  {
    id: 188,
    type: 'multiple_choice',
    question_text:
      'A new server is deployed in a trusted zone and is validated to be online with all appropriate services running. However, users in a perimeter network cannot access the server. Which of the following should a network administrator do to resolve the reported issue?',
    options: [
      {
        letter: 'A',
        text: 'Create a TXT record on the DNS server for the new server.',
      },
      {
        letter: 'B',
        text: 'Update the firewall ACL to allow access to the new server.',
      },
      {
        letter: 'C',
        text: 'Configure a static route for the user VLAN to the new server.',
      },
      {
        letter: 'D',
        text: 'Insert a static ARP entry for the new server on the Layer 3 switch.',
      },
    ],
    correct_answer: 'B',
  },
  {
    id: 189,
    type: 'multiple_choice',
    question_text:
      'Network administrators are using the Telnet protocol to administer network devices that are on the 192.168.1.0/24 subnet. Which of the following tools should the administrator use to best identify the devices?',
    options: [
      { letter: 'A', text: 'dig' },
      { letter: 'B', text: 'nmap' },
      { letter: 'C', text: 'tracert' },
      { letter: 'D', text: 'telnet' },
    ],
    correct_answer: 'B',
  },
  {
    id: 190,
    type: 'multiple_choice',
    question_text:
      'A network administrator recently updated configurations on a Layer 3 switch. Following the updates, users report being unable to reach a specific file server. Which of the following is the most likely cause?',
    options: [
      { letter: 'A', text: 'Incorrect ACLs' },
      { letter: 'B', text: 'Switching loop' },
      { letter: 'C', text: 'Duplicate IP addresses' },
      { letter: 'D', text: 'Wrong default route' },
    ],
    correct_answer: 'A',
  },
  {
    id: 191,
    type: 'multiple_choice',
    question_text:
      'A network engineer wants to implement a solution where all web servers will send event data over port 514. Which of the following services will accomplish this task?',
    options: [
      { letter: 'A', text: 'Syslog' },
      { letter: 'B', text: 'SMTP' },
      { letter: 'C', text: 'DNS' },
      { letter: 'D', text: 'DHCP' },
    ],
    correct_answer: 'A',
  },
  {
    id: 192,
    type: 'multiple_choice',
    question_text:
      "A security administrator wants to discover zero-day attacks before they can be used on the company's network. Which of the following can the administrator use to accomplish this task?",
    options: [
      { letter: 'A', text: 'Central repository' },
      { letter: 'B', text: 'Honeypot' },
      { letter: 'C', text: 'Next-generation firewall' },
      { letter: 'D', text: 'Evil twin' },
    ],
    correct_answer: 'B',
  },
  {
    id: 193,
    type: 'multiple_choice',
    question_text:
      'Users at a satellite office are experiencing issues when using videoconferencing. Which of the following should a technician focus on first to rectify these issues?',
    options: [
      { letter: 'A', text: 'Quality of service' },
      { letter: 'B', text: 'Network signal' },
      { letter: 'C', text: 'Time to live' },
      { letter: 'D', text: 'Load balancing' },
    ],
    correct_answer: 'B',
  },
  {
    id: 194,
    type: 'multiple_choice',
    question_text:
      'A network administrator is trying to locate the switch interface a PC is connected to. The administrator accesses the local switch, pings the PC IP address, and then uses the command show arp. Which of the following commands should the administrator use next?',
    options: [
      { letter: 'A', text: 'show route' },
      { letter: 'B', text: 'show mac-address-table' },
      { letter: 'C', text: 'show vlan' },
      { letter: 'D', text: 'show interface' },
    ],
    correct_answer: 'B',
  },
  {
    id: 195,
    type: 'multiple_choice',
    question_text:
      'A user attempts to log in to a corporate website by utilizing a shortcut. The shortcut has been used many times before. The user then notices some discrepancies on the company website. Which of the following is most likely the reason for this issue?',
    options: [
      { letter: 'A', text: 'VLAN hopping' },
      { letter: 'B', text: 'ARP spoofing' },
      { letter: 'C', text: 'DNS poisoning' },
      { letter: 'D', text: 'MAC flooding' },
    ],
    correct_answer: 'C',
  },
  {
    id: 196,
    type: 'multiple_choice',
    question_text:
      'Which of the following is the correct order of components in a bottom-up approach for the three-tier hierarchical model?',
    options: [
      { letter: 'A', text: 'Access, distribution, and core' },
      { letter: 'B', text: 'Core, root, and distribution' },
      { letter: 'C', text: 'Core, spine, and leaf' },
      { letter: 'D', text: 'Access, core, and root' },
    ],
    correct_answer: 'A',
  },
  {
    id: 197,
    type: 'multiple_choice',
    question_text:
      'A client with a 2.4GHz wireless network has stated that the entire office is experiencing intermittent issues with laptops after the WAP was moved. Which of the following is the most likely reason for these issues?',
    options: [
      { letter: 'A', text: 'The network uses a non-overlapping channel.' },
      { letter: 'B', text: 'The signal is reflecting too much.' },
      { letter: 'C', text: 'The network has excessive noise.' },
      { letter: 'D', text: 'A microwave is in the office.' },
    ],
    correct_answer: 'D',
  },
  {
    id: 198,
    type: 'multiple_choice',
    question_text:
      'Which of the following SD-WAN features allows a router to be shipped directly to the installation site and does not require site-level configuration?',
    options: [
      { letter: 'A', text: 'Zero-touch provisioning' },
      { letter: 'B', text: 'Application aware' },
      { letter: 'C', text: 'Transport agnostic' },
      { letter: 'D', text: 'Central policy management' },
    ],
    correct_answer: 'A',
  },
  {
    id: 199,
    type: 'multiple_choice',
    question_text:
      "A network technician is troubleshooting network latency... between two network switches (Switch10 and Switch11). Symptoms reported include poor video performance and slow file copying. Given the following information:\nSwitch10 'show interfaces' output:\nMTU 1600 bytes, Speed 1000/full, VLAN10\n12912 packets input, 2398471 bytes, 0 runts, 0 giants\n19328 packets output, 9832984 bytes, 0 runts, 0 giants\nSwitch11 'show interfaces' output:\nMTU 1500 bytes, Speed Auto Negotiate, VLAN10\n19328 packets input, 9832984 bytes, 0 runts, 2394 giants\n12912 packets output, 2398471 bytes, 0 runts, 0 giants\nWhich of the following should the technician most likely do to resolve the issue?",
    options: [
      { letter: 'A', text: 'Disable automatic negotiation on Switch11.' },
      { letter: 'B', text: 'Modify Switch10 MTU value to 1500.' },
      { letter: 'C', text: 'Configure STP on both switches.' },
      { letter: 'D', text: 'Change the native VLAN on the ports.' },
    ],
    correct_answer: 'B',
  },
  {
    id: 200,
    type: 'multiple_choice',
    question_text:
      'Which of the following types of routes will take precedence when building a routing table for a given subnet?',
    options: [
      { letter: 'A', text: 'Static' },
      { letter: 'B', text: 'BGP' },
      { letter: 'C', text: 'OSPF' },
      { letter: 'D', text: 'Default' },
    ],
    correct_answer: 'A',
  },
  // ... 1-50
  {
    id: 7,
    type: 'multiple_choice',
    question_text:
      'Which of the following steps of the troubleshooting methodology would most likely include checking through each level of the OSI model after the problem has been identified?',
    options: [
      { letter: 'A', text: 'Establish a theory.' },
      { letter: 'B', text: 'Implement the solution.' },
      { letter: 'C', text: 'Create a plan of action.' },
      { letter: 'D', text: 'Verify functionality.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 8,
    type: 'multiple_choice',
    question_text:
      "While troubleshooting a VoIP handset connection, a technician's laptop is able to successfully connect to network resources using the same port. The technician needs to identify the port on the switch. Which of the following should the technician use to determine the switch and port?",
    options: [
      { letter: 'A', text: 'LLDP' },
      { letter: 'B', text: 'IKE' },
      { letter: 'C', text: 'VLAN' },
      { letter: 'D', text: 'netstat' },
    ],
    correct_answer: 'A',
  },
  {
    id: 9,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to set up a file server to allow user access. The organization uses DHCP to assign IP addresses. Which of the following is the best solution for the administrator to set up?',
    options: [
      {
        letter: 'A',
        text: 'A separate scope for the file server using a /32 subnet',
      },
      {
        letter: 'B',
        text: 'A reservation for the server based on the MAC address',
      },
      { letter: 'C', text: 'A static IP address within the DHCP IP range' },
      { letter: 'D', text: 'A SLAAC for the server' },
    ],
    correct_answer: 'B',
  },
  {
    id: 10,
    type: 'multiple_choice',
    question_text:
      'Which of the following technologies are X.509 certificates most commonly associated with?',
    options: [
      { letter: 'A', text: 'PKI' },
      { letter: 'B', text: 'VLAN tagging' },
      { letter: 'C', text: 'LDAP' },
      { letter: 'D', text: 'MFA' },
    ],
    correct_answer: 'A',
  },
  {
    id: 11,
    type: 'multiple_choice',
    question_text:
      "A network administrator wants to implement an authentication process for temporary access to an organization's network. Which of the following technologies would facilitate this process?",
    options: [
      { letter: 'A', text: 'Captive portal' },
      { letter: 'B', text: 'Enterprise authentication' },
      { letter: 'C', text: 'Ad hoc network' },
      { letter: 'D', text: 'WPA3' },
    ],
    correct_answer: 'A',
  },
  {
    id: 12,
    type: 'multiple_choice',
    question_text:
      'A user is unable to navigate to a website because the provided URL is not resolving to the correct IP address. Other users are able to navigate to the intended website without issue. Which of the following is most likely causing this issue?',
    options: [
      { letter: 'A', text: 'Hosts file' },
      { letter: 'B', text: 'Self-signed certificate' },
      { letter: 'C', text: 'Nameserver record' },
      { letter: 'D', text: 'IP helper' },
    ],
    correct_answer: 'A',
  },
  {
    id: 13,
    type: 'multiple_choice',
    question_text:
      'A network administrator is planning to host a company application in the cloud, making the application available for all internal and third-party users. Which of the following concepts describes this arrangement?',
    options: [
      { letter: 'A', text: 'Multitenancy' },
      { letter: 'B', text: 'VPC' },
      { letter: 'C', text: 'NFV' },
      { letter: 'D', text: 'SaaS' },
    ],
    correct_answer: 'A',
  },
  {
    id: 14,
    type: 'multiple_choice',
    question_text:
      'Which of the following should be used to obtain remote access to a network appliance that has failed to start up properly?',
    options: [
      { letter: 'A', text: 'Crash cart' },
      { letter: 'B', text: 'Jump box' },
      { letter: 'C', text: 'Secure Shell' },
      { letter: 'D', text: 'Out-of-band management' },
    ],
    correct_answer: 'D',
  },
  {
    id: 15,
    type: 'multiple_choice',
    question_text:
      'Which of the following attacks utilizes a network packet that contains multiple network tags?',
    options: [
      { letter: 'A', text: 'MAC flooding' },
      { letter: 'B', text: 'VLAN hopping' },
      { letter: 'C', text: 'DNS spoofing' },
      { letter: 'D', text: 'ARP poisoning' },
    ],
    correct_answer: 'B',
  },
  {
    id: 16,
    type: 'multiple_choice',
    question_text:
      'A network administrator is configuring a new switch and wants to connect two ports to the core switch to ensure redundancy. Which of the following configurations would meet this requirement?',
    options: [
      { letter: 'A', text: 'Full duplex' },
      { letter: 'B', text: '802.1Q tagging' },
      { letter: 'C', text: 'Native VLAN' },
      { letter: 'D', text: 'Link aggregation' },
    ],
    correct_answer: 'D',
  },
  {
    id: 17,
    type: 'multiple_choice',
    question_text: 'Which of the following ports is used for secure email?',
    options: [
      { letter: 'A', text: '25' },
      { letter: 'B', text: '110' },
      { letter: 'C', text: '143' },
      { letter: 'D', text: '587' },
    ],
    correct_answer: 'D',
  },
  {
    id: 18,
    type: 'multiple_choice',
    question_text:
      'A client wants to increase overall security after a recent breach. Which of the following would be best to implement? (Choose two.)',
    options: [
      { letter: 'A', text: 'Least privilege network access' },
      { letter: 'B', text: 'Dynamic inventories' },
      { letter: 'C', text: 'Central policy management' },
      { letter: 'D', text: 'Zero-touch provisioning' },
      { letter: 'E', text: 'Configuration drift prevention' },
      { letter: 'F', text: 'Subnet range limits' },
    ],
    correct_answer: ['A', 'C'],
  },
  {
    id: 19,
    type: 'multiple_choice',
    question_text:
      'Which of the following is a cost-effective advantage of a split-tunnel VPN?',
    options: [
      { letter: 'A', text: 'Web traffic is filtered through a web filler.' },
      {
        letter: 'B',
        text: "More bandwidth is required on the company's internet connection.",
      },
      {
        letter: 'C',
        text: "Monitoring detects insecure machines on the company's network.",
      },
      {
        letter: 'D',
        text: "Cloud-based traffic flows outside of the company's network.",
      },
    ],
    correct_answer: 'D',
  },
  {
    id: 20,
    type: 'multiple_choice',
    question_text:
      "A network technician is troubleshooting a web application's poor performance. The office has two internet links that share the traffic load. Which of the following tools should the technician use to determine which link is being used for the web application?",
    options: [
      { letter: 'A', text: 'netstat' },
      { letter: 'B', text: 'nslookup' },
      { letter: 'C', text: 'ping' },
      { letter: 'D', text: 'tracert' },
    ],
    correct_answer: 'D',
  },
  {
    id: 21,
    type: 'multiple_choice',
    question_text:
      'Which of the following attacks can cause users who are attempting to access a company website to be directed to an entirely different website?',
    options: [
      { letter: 'A', text: 'DNS poisoning' },
      { letter: 'B', text: 'Denial-of-service' },
      { letter: 'C', text: 'Social engineering' },
      { letter: 'D', text: 'ARP spoofing' },
    ],
    correct_answer: 'A',
  },
  {
    id: 22,
    type: 'multiple_choice',
    question_text:
      'As part of an attack, a threat actor purposefully overflows the content-addressable memory (CAM) table on a switch. Which of the following types of attacks is this scenario an example of?',
    options: [
      { letter: 'A', text: 'ARP spoofing' },
      { letter: 'B', text: 'Evil twin' },
      { letter: 'C', text: 'MAC flooding' },
      { letter: 'D', text: 'DNS poisoning' },
    ],
    correct_answer: 'C',
  },
  {
    id: 23,
    type: 'multiple_choice',
    question_text:
      "A company's office has publicly accessible meeting rooms equipped with network ports. A recent audit revealed that visitors were able to access the corporate network by plugging personal laptops into open network ports. Which of the following should the company implement to prevent this in the future?",
    options: [
      { letter: 'A', text: 'URL filters' },
      { letter: 'B', text: 'VPN' },
      { letter: 'C', text: 'ACLs' },
      { letter: 'D', text: 'NAC' },
    ],
    correct_answer: 'D',
  },
  {
    id: 24,
    type: 'multiple_choice',
    question_text:
      'A user notifies a network administrator about losing access to a remote file server. The network administrator is able to ping the server and verifies the current firewall rules do not block access to the network fileshare. Which of the following tools would help identify which ports are open on the remote file server?',
    options: [
      { letter: 'A', text: 'dig' },
      { letter: 'B', text: 'nmap' },
      { letter: 'C', text: 'tracert' },
      { letter: 'D', text: 'nslookup' },
    ],
    correct_answer: 'B',
  },
  {
    id: 25,
    type: 'multiple_choice',
    question_text:
      'Which of the following technologies is the best choice to listen for requests and distribute user traffic across web servers?',
    options: [
      { letter: 'A', text: 'Router' },
      { letter: 'B', text: 'Switch' },
      { letter: 'C', text: 'Firewall' },
      { letter: 'D', text: 'Load balancer' },
    ],
    correct_answer: 'D',
  },
  {
    id: 26,
    type: 'multiple_choice',
    question_text:
      'A company is hosting a secure server that requires all connections to the server to be encrypted. A junior administrator needs to harden the web server. The following ports on the web server are open: 443, 80, 22, 587. Which of the following ports should be disabled?',
    options: [
      { letter: 'A', text: '22' },
      { letter: 'B', text: '80' },
      { letter: 'C', text: '443' },
      { letter: 'D', text: '587' },
    ],
    correct_answer: 'B',
  },
  {
    id: 27,
    type: 'multiple_choice',
    question_text:
      'Which of the following is the next step to take after successfully testing a root cause theory?',
    options: [
      { letter: 'A', text: 'Determine resolution steps.' },
      { letter: 'B', text: 'Duplicate the problem in a lab.' },
      { letter: 'C', text: 'Present the theory for approval.' },
      { letter: 'D', text: 'Implement the solution to the problem.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 28,
    type: 'multiple_choice',
    question_text:
      'A network administrator is configuring a new switch and wants to ensure that only assigned devices can connect to the switch. Which of the following should the administrator do?',
    options: [
      { letter: 'A', text: 'Configure ACLs.' },
      { letter: 'B', text: 'Implement a captive portal.' },
      { letter: 'C', text: 'Enable port security.' },
      { letter: 'D', text: 'Disable unnecessary services.' },
    ],
    correct_answer: 'C',
  },
  {
    id: 29,
    type: 'multiple_choice',
    question_text:
      'A customer needs six usable IP addresses. Which of the following best meets this requirement?',
    options: [
      { letter: 'A', text: '255.255.255.128' },
      { letter: 'B', text: '255.255.255.192' },
      { letter: 'C', text: '255.255.255.224' },
      { letter: 'D', text: '255.255.255.240' },
    ],
    correct_answer: 'D',
  },
  {
    id: 30,
    type: 'multiple_choice',
    question_text:
      "A user reports having intermittent connectivity issues to the company network. The network configuration for the user reveals the following: IP address: 192.168.1.10, Subnet mask: 255.255.255.0, Default gateway: 192.168.1.254. The network switch shows an ARP table with two different MAC addresses (0c00.1134.0001 and 0c00.1298.d239) both mapped to the IP address 192.168.1.10 on VLAN 10. Which of the following is the most likely cause of the user's connection issues?",
    options: [
      { letter: 'A', text: 'A port with incorrect VLAN assigned' },
      { letter: 'B', text: 'A switch with spanning tree conflict' },
      { letter: 'C', text: 'Another PC with manually configured IP' },
      { letter: 'D', text: 'A router with overlapping route tables' },
    ],
    correct_answer: 'C',
  },
  {
    id: 31,
    type: 'multiple_choice',
    question_text:
      'Which of the following is created to illustrate the effectiveness of wireless networking coverage in a building?',
    options: [
      { letter: 'A', text: 'Logical diagram' },
      { letter: 'B', text: 'Layer 3 network diagram' },
      { letter: 'C', text: 'Service-level agreement' },
      { letter: 'D', text: 'Heat map' },
    ],
    correct_answer: 'D',
  },
  {
    id: 32,
    type: 'multiple_choice',
    question_text:
      'Which of the following cloud deployment models is most commonly associated with multitenancy and is generally offered by a service provider?',
    options: [
      { letter: 'A', text: 'Private' },
      { letter: 'B', text: 'Community' },
      { letter: 'C', text: 'Public' },
      { letter: 'D', text: 'Hybrid' },
    ],
    correct_answer: 'C',
  },
  {
    id: 33,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to create an SVI on a Layer 3-capable device to separate voice and data traffic. Which of the following best explains this use case?',
    options: [
      {
        letter: 'A',
        text: 'A physical interface used for trunking logical ports',
      },
      { letter: 'B', text: 'A physical interface used for management access' },
      {
        letter: 'C',
        text: 'A logical interface used for the routing of VLANS',
      },
      {
        letter: 'D',
        text: 'A logical interface used when the number of physical ports is insufficient',
      },
    ],
    correct_answer: 'C',
  },
  {
    id: 34,
    type: 'multiple_choice',
    question_text:
      'A network administrator is performing a refresh of a wireless environment. As the APs are being placed, they overlap a little bit with each other. Which of the following 2.4GHz channels should be selected to ensure that they do not conflict?',
    options: [
      { letter: 'A', text: '1, 3, 5' },
      { letter: 'B', text: '1, 6, 11' },
      { letter: 'C', text: '2, 6, 10' },
      { letter: 'D', text: '3, 6, 9' },
    ],
    correct_answer: 'B',
  },
  {
    id: 35,
    type: 'multiple_choice',
    question_text:
      'Which of the following network cables involves bouncing light off of protective cladding?',
    options: [
      { letter: 'A', text: 'Twinaxial' },
      { letter: 'B', text: 'Coaxial' },
      { letter: 'C', text: 'Single-mode' },
      { letter: 'D', text: 'Multimode' },
    ],
    correct_answer: 'D',
  },
  {
    id: 36,
    type: 'multiple_choice',
    question_text:
      'Which of the following would allow a network administrator to analyze attacks coming from the internet without affecting latency?',
    options: [
      { letter: 'A', text: 'IPS' },
      { letter: 'B', text: 'IDS' },
      { letter: 'C', text: 'Load balancer' },
      { letter: 'D', text: 'Firewall' },
    ],
    correct_answer: 'B',
  },
  {
    id: 37,
    type: 'multiple_choice',
    question_text:
      "A technician is troubleshooting wireless connectivity near a break room. Whenever a user turns on the microwave, connectivity to the user's laptop is lost. Which of the following frequency bands is the laptop most likely using?",
    options: [
      { letter: 'A', text: '2.4GHz' },
      { letter: 'B', text: '5GHz' },
      { letter: 'C', text: '6GHz' },
      { letter: 'D', text: '900MHz' },
    ],
    correct_answer: 'A',
  },
  {
    id: 38,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to implement routing capabilities in a hypervisor. Which of the following should the administrator most likely implement?',
    options: [
      { letter: 'A', text: 'VPC' },
      { letter: 'B', text: 'Firewall' },
      { letter: 'C', text: 'NFV' },
      { letter: 'D', text: 'IaaS' },
    ],
    correct_answer: 'C',
  },
  {
    id: 39,
    type: 'multiple_choice',
    question_text:
      'A network technician needs to install patch cords from the UTP patch panel to the access switch for a newly occupied set of offices. The patch panel is not labeled for easy jack identification. Which of the following tools provides the easiest way to identify the appropriate patch panel port?',
    options: [
      { letter: 'A', text: 'Toner' },
      { letter: 'B', text: 'Laptop' },
      { letter: 'C', text: 'Cable tester' },
      { letter: 'D', text: 'Visual fault locator' },
    ],
    correct_answer: 'A',
  },
  {
    id: 40,
    type: 'multiple_choice',
    question_text:
      'A network administrator received complaints of intermittent network connectivity issues. The administrator investigates and finds that the network design contains potential loop scenarios. Which of the following should the administrator do?',
    options: [
      { letter: 'A', text: 'Enable spanning tree.' },
      { letter: 'B', text: 'Configure port security.' },
      { letter: 'C', text: 'Change switch port speed limits.' },
      { letter: 'D', text: 'Enforce 802.1Q tagging.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 41,
    type: 'multiple_choice',
    question_text:
      'Which of the following routing technologies uses a successor and a feasible successor?',
    options: [
      { letter: 'A', text: 'IS-IS' },
      { letter: 'B', text: 'OSPF' },
      { letter: 'C', text: 'BGP' },
      { letter: 'D', text: 'EIGRP' },
    ],
    correct_answer: 'D',
  },
  {
    id: 42,
    type: 'multiple_choice',
    question_text:
      'Which of the following best describes what an organization would use port address translation for?',
    options: [
      { letter: 'A', text: 'VLANs on the perimeter' },
      { letter: 'B', text: 'Public address on the perimeter router' },
      { letter: 'C', text: 'Non-routable address on the perimeter router' },
      { letter: 'D', text: 'Servers on the perimeter' },
    ],
    correct_answer: 'C',
  },
  {
    id: 43,
    type: 'multiple_choice',
    question_text:
      'A company is implementing a wireless solution in a high-density environment. Which of the following 802.11 standards is used when a company is concerned about device saturation and coverage?',
    options: [
      { letter: 'A', text: '802.11ac' },
      { letter: 'B', text: '802.11ax' },
      { letter: 'C', text: '802.11g' },
      { letter: 'D', text: '802.11n' },
    ],
    correct_answer: 'B',
  },
  {
    id: 44,
    type: 'multiple_choice',
    question_text:
      'Which of the following network traffic types is sent to all nodes on the network?',
    options: [
      { letter: 'A', text: 'Unicast' },
      { letter: 'B', text: 'Broadcast' },
      { letter: 'C', text: 'Multicast' },
      { letter: 'D', text: 'Anycast' },
    ],
    correct_answer: 'B',
  },
  {
    id: 45,
    type: 'multiple_choice',
    question_text:
      'Which of the following cable types provides the highest possible transmission speed?',
    options: [
      { letter: 'A', text: 'Plenum' },
      { letter: 'B', text: 'Ethernet' },
      { letter: 'C', text: 'Fiber-optic' },
      { letter: 'D', text: 'DAC' },
    ],
    correct_answer: 'C',
  },
  {
    id: 46,
    type: 'multiple_choice',
    question_text:
      'Which of the following layers of the OSI model is responsible for end-to-end encryption?',
    options: [
      { letter: 'A', text: 'Presentation' },
      { letter: 'B', text: 'Application' },
      { letter: 'C', text: 'Session' },
      { letter: 'D', text: 'Transport' },
    ],
    correct_answer: 'A',
  },
  {
    id: 47,
    type: 'multiple_choice',
    question_text:
      'A network security administrator needs to monitor the contents of data sent between a secure network and the rest of the company. Which of the following monitoring methods will accomplish this task?',
    options: [
      { letter: 'A', text: 'Port mirroring' },
      { letter: 'B', text: 'Flow data' },
      { letter: 'C', text: 'Syslog entries' },
      { letter: 'D', text: 'SNMP traps' },
    ],
    correct_answer: 'A',
  },
  {
    id: 48,
    type: 'multiple_choice',
    question_text: 'Which of the following does a full-tunnel VPN provide?',
    options: [
      { letter: 'A', text: 'Lower bandwidth requirements' },
      { letter: 'B', text: 'The ability to reset local computer passwords' },
      { letter: 'C', text: 'Corporate inspection of all network traffic' },
      { letter: 'D', text: 'Access to blocked sites' },
    ],
    correct_answer: 'C',
  },
  {
    id: 49,
    type: 'multiple_choice',
    question_text: 'Which of the following does a hash provide?',
    options: [
      { letter: 'A', text: 'Non-repudiation' },
      { letter: 'B', text: 'Integrity' },
      { letter: 'C', text: 'Confidentiality' },
      { letter: 'D', text: 'Availability' },
    ],
    correct_answer: 'B',
  },
  {
    id: 50,
    type: 'multiple_choice',
    question_text:
      'A company wants to implement a disaster recovery site for non-critical applications, which can tolerate a short period of downtime. Which of the following types of sites should the company implement to achieve this goal?',
    options: [
      { letter: 'A', text: 'Hot' },
      { letter: 'B', text: 'Cold' },
      { letter: 'C', text: 'Warm' },
      { letter: 'D', text: 'Passive' },
    ],
    correct_answer: 'C',
  },
  // ... 251-300
  {
    id: 251,
    type: 'multiple_choice',
    question_text:
      'A network engineer is completing a wireless installation in a new building. A requirement is that all clients be able to automatically connect to the fastest supported network. Which of the following best supports this requirement?',
    options: [
      { letter: 'A', text: 'Enabling band steering' },
      { letter: 'B', text: 'Disabling the 5GHz SSID' },
      { letter: 'C', text: 'Adding a captive portal' },
      { letter: 'D', text: 'Configuring MAC filtering' },
    ],
    correct_answer: 'A',
  },
  {
    id: 252,
    type: 'multiple_choice',
    question_text:
      'A network technician notices a device is at EOL. For which of the following should the technician plan?',
    options: [
      { letter: 'A', text: 'Retrofitting' },
      { letter: 'B', text: 'Decommissioning' },
      { letter: 'C', text: 'Restarting' },
      { letter: 'D', text: 'Upgrading' },
    ],
    correct_answer: 'B',
  },
  {
    id: 253,
    type: 'multiple_choice',
    question_text:
      'A company implements a video streaming solution that will play on all computers that have joined a particular group, but router ACLs are blocking the traffic. Which of the following is the most appropriate IP address that will be allowed in the ACL?',
    options: [
      { letter: 'A', text: '127.0.0.1' },
      { letter: 'B', text: '172.17.1.1' },
      { letter: 'C', text: '224.0.0.1' },
      { letter: 'D', text: '240.0.0.1' },
    ],
    correct_answer: 'C',
  },
  {
    id: 254,
    type: 'multiple_choice',
    question_text:
      'Which of the following are the best device-hardening techniques for network security? (Choose two.)',
    options: [
      { letter: 'A', text: 'Disabling unused ports' },
      {
        letter: 'B',
        text: 'Performing regular scanning of unauthorized devices',
      },
      { letter: 'C', text: 'Monitoring system logs for irregularities' },
      { letter: 'D', text: 'Enabling logical security such as SSO' },
      { letter: 'E', text: 'Changing default passwords' },
      { letter: 'F', text: 'Ensuring least privilege concepts are in place' },
    ],
    correct_answer: ['A', 'E'],
  },
  {
    id: 255,
    type: 'multiple_choice',
    question_text:
      'Which of the following allows for the interception of traffic between the source and destination?',
    options: [
      { letter: 'A', text: 'Self-signed certificate' },
      { letter: 'B', text: 'VLAN hopping' },
      { letter: 'C', text: 'On-path attack' },
      { letter: 'D', text: 'Phishing' },
    ],
    correct_answer: 'C',
  },
  {
    id: 256,
    type: 'multiple_choice',
    question_text:
      'A company discovers on video surveillance recordings that an unauthorized person installed a rogue access point in its secure facility. Which of the following allowed the unauthorized person to do this?',
    options: [
      { letter: 'A', text: 'Evil twin' },
      { letter: 'B', text: 'Honeytrap' },
      { letter: 'C', text: 'Wardriving' },
      { letter: 'D', text: 'Tailgating' },
    ],
    correct_answer: 'D',
  },
  {
    id: 257,
    type: 'multiple_choice',
    question_text:
      'A secure communication link needs to be configured between data centers via the internet. The data centers are located in different regions. Which of the following is the best protocol for the network administrator to use?',
    options: [
      { letter: 'A', text: 'DCI' },
      { letter: 'B', text: 'GRE' },
      { letter: 'C', text: 'VXLAN' },
      { letter: 'D', text: 'IPSec' },
    ],
    correct_answer: 'D',
  },
  {
    id: 258,
    type: 'multiple_choice',
    question_text:
      'Which of the following can be implemented to to add an additional layer of security between a corporate network and network management interfaces?',
    options: [
      { letter: 'A', text: 'Jump box' },
      { letter: 'B', text: 'Console server' },
      { letter: 'C', text: 'API interface' },
      { letter: 'D', text: 'In-band management' },
    ],
    correct_answer: 'A',
  },
  {
    id: 259,
    type: 'multiple_choice',
    question_text:
      'A network administrator performed upgrades on a server and installed a new NIC to improve performance. Following the upgrades, users are unable to reach the server. Which of the following is the most likely reason?',
    options: [
      { letter: 'A', text: 'The PoE power budget was exceeded.' },
      { letter: 'B', text: 'TX/RX was transposed.' },
      { letter: 'C', text: 'A port security violation occurred.' },
      { letter: 'D', text: 'An incorrect cable type was installed.' },
    ],
    correct_answer: 'C',
  },
  {
    id: 260,
    type: 'multiple_choice',
    question_text:
      'A junior network technician at a large company needs to create networks from a Class C address with 14 hosts per subnet. Which of the following numbers of host bits is required?',
    options: [
      { letter: 'A', text: 'One' },
      { letter: 'B', text: 'Two' },
      { letter: 'C', text: 'Three' },
      { letter: 'D', text: 'Four' },
    ],
    correct_answer: 'D',
  },
  {
    id: 261,
    type: 'multiple_choice',
    question_text:
      "Which of the following is a company most likely enacting if an accountant for the company can only see the financial department's shared folders?",
    options: [
      { letter: 'A', text: 'General Data Protection Regulation' },
      { letter: 'B', text: 'Least privilege network access' },
      { letter: 'C', text: 'Acceptable use policy' },
      { letter: 'D', text: 'End user license agreement' },
    ],
    correct_answer: 'B',
  },
  {
    id: 262,
    type: 'multiple_choice',
    question_text:
      'Which of the following connector types would most likely be used to connect to an external antenna?',
    options: [
      { letter: 'A', text: 'BNC' },
      { letter: 'B', text: 'ST' },
      { letter: 'C', text: 'LC' },
      { letter: 'D', text: 'MPO' },
    ],
    correct_answer: 'A',
  },
  {
    id: 263,
    type: 'multiple_choice',
    question_text:
      'A company recently converted most of the office laptops to connect wirelessly to the corporate network. After a recent high-traffic malware attack, narrowing the event to a specific user was difficult because of the wireless configuration. Which of the following actions should the company take?',
    options: [
      { letter: 'A', text: 'Restrict users to the 5GHz frequency.' },
      { letter: 'B', text: 'Upgrade to a mesh network.' },
      { letter: 'C', text: 'Migrate from PSK to Enterprise.' },
      { letter: 'D', text: 'Implement WPA2 encryption.' },
    ],
    correct_answer: 'C',
  },
  {
    id: 264,
    type: 'multiple_choice',
    question_text:
      'Which of the following cloud service models most likely requires the greatest up-front expense by the customer when migrating a data center to the cloud?',
    options: [
      { letter: 'A', text: 'Infrastructure as a service' },
      { letter: 'B', text: 'Software as a service' },
      { letter: 'C', text: 'Platform as a service' },
      { letter: 'D', text: 'Network as a service' },
    ],
    correct_answer: 'A',
  },
  {
    id: 265,
    type: 'multiple_choice',
    question_text:
      'After providing a username and password, a user must input a passcode from a phone application. Which of the following authentication technologies is used in this example?',
    options: [
      { letter: 'A', text: 'SSO' },
      { letter: 'B', text: 'LDAP' },
      { letter: 'C', text: 'MFA' },
      { letter: 'D', text: 'SAML' },
    ],
    correct_answer: 'C',
  },
  {
    id: 266,
    type: 'multiple_choice',
    question_text:
      'Which of the following facilities is the best example of a warm site in the event of information system disruption?',
    options: [
      {
        letter: 'A',
        text: 'A combination of public and private loud services to restore data',
      },
      {
        letter: 'B',
        text: 'A partial infrastructure, software, and data on site',
      },
      {
        letter: 'C',
        text: 'A full electrical infrastructure in place, but no customer devices on site',
      },
      {
        letter: 'D',
        text: 'A full infrastructure in place, but no current data on site',
      },
    ],
    correct_answer: 'B',
  },
  {
    id: 267,
    type: 'multiple_choice',
    question_text: 'Which of the following services runs on port 636?',
    options: [
      { letter: 'A', text: 'SMTP' },
      { letter: 'B', text: 'Syslog' },
      { letter: 'C', text: 'TFTP' },
      { letter: 'D', text: 'LDAPS' },
    ],
    correct_answer: 'D',
  },
  {
    id: 268,
    type: 'multiple_choice',
    question_text:
      'A company wants to implement data loss prevention by restricting user access to social media platforms and personal cloud storage on workstations. Which of the following types of filtering should the company deploy to achieve these goals?',
    options: [
      { letter: 'A', text: 'Port' },
      { letter: 'B', text: 'DNS' },
      { letter: 'C', text: 'MAC' },
      { letter: 'D', text: 'Content' },
    ],
    correct_answer: 'D',
  },
  {
    id: 269,
    type: 'multiple_choice',
    question_text:
      'An organization is struggling to get effective coverage using the wireless network. The organization wants to implement a solution that will allow for continuous connectivity anywhere in the facility. Which of the following should the network administrator suggest to ensure the best coverage?',
    options: [
      { letter: 'A', text: 'Implementing additional ad hoc access points' },
      {
        letter: 'B',
        text: 'Providing more Ethernet drops for user connections',
      },
      { letter: 'C', text: 'Deploying a mesh network in the building' },
      { letter: 'D', text: 'Changing the current frequency of the Wi-Fi' },
    ],
    correct_answer: 'C',
  },
  {
    id: 270,
    type: 'multiple_choice',
    question_text:
      'Which of the following protocols allows automatic routing failover for an active-passive firewall pair?',
    options: [
      { letter: 'A', text: 'EIGRP' },
      { letter: 'B', text: 'OSPF' },
      { letter: 'C', text: 'VRRP' },
      { letter: 'D', text: 'BGP' },
    ],
    correct_answer: 'C',
  },
  {
    id: 271,
    type: 'multiple_choice',
    question_text:
      'Which of the following is a major difference between an IPS and IDS?',
    options: [
      {
        letter: 'A',
        text: 'An IPS needs to be installed in line with traffic and an IDS does not.',
      },
      { letter: 'B', text: 'An IPS is signature-based and an IDS is not.' },
      {
        letter: 'C',
        text: 'An IPS is less susceptible to false positives than an IDS.',
      },
      {
        letter: 'D',
        text: 'An IPS requires less administrative overhead than an IDS.',
      },
    ],
    correct_answer: 'A',
  },
  {
    id: 272,
    type: 'multiple_choice',
    question_text:
      'Which of the following describes the best reason for using BGP?',
    options: [
      { letter: 'A', text: 'Preventing a loop within a LAN' },
      { letter: 'B', text: 'Improving reconvergence times' },
      { letter: 'C', text: 'Exchanging router updates with a different ISP' },
      { letter: 'D', text: 'Sharing routes with a Layer 3 switch' },
    ],
    correct_answer: 'C',
  },
  {
    id: 273,
    type: 'multiple_choice',
    question_text:
      'Which of the following steps of the troubleshooting methodology comes after testing the theory to determine cause?',
    options: [
      { letter: 'A', text: 'Verify full system functionality.' },
      { letter: 'B', text: 'Document the findings and outcomes.' },
      { letter: 'C', text: 'Establish a plan of action.' },
      { letter: 'D', text: 'Identify the problem.' },
    ],
    correct_answer: 'C',
  },
  {
    id: 274,
    type: 'multiple_choice',
    question_text:
      'A network administrator installed a new VLAN to the network after a company added an additional floor to the office. Users are unable to obtain an IP address on the new VLAN, but ports on existing VLANs are working properly. Which of the following configurations should the administrator update?',
    options: [
      { letter: 'A', text: 'Scope size' },
      { letter: 'B', text: 'Address reservations' },
      { letter: 'C', text: 'Lease time' },
      { letter: 'D', text: 'IP helper' },
    ],
    correct_answer: 'D',
  },
  {
    id: 275,
    type: 'multiple_choice',
    question_text:
      'A network engineer needs to add a boundary network to isolate and separate the internal network from the public-facing internet. Which of the following security defense solutions would best accomplish this task?',
    options: [
      { letter: 'A', text: 'Trusted zones' },
      { letter: 'B', text: 'URL filtering' },
      { letter: 'C', text: 'ACLs' },
      { letter: 'D', text: 'Screened subnet' },
    ],
    correct_answer: 'D',
  },
  {
    id: 276,
    type: 'multiple_choice',
    question_text:
      'Which of the following can help prevent unauthorized modifications to hardware when designing an MDF closet?',
    options: [
      { letter: 'A', text: 'Lockable cabinets' },
      { letter: 'B', text: 'Uninterruptable power supply' },
      { letter: 'C', text: 'Port security' },
      { letter: 'D', text: 'Microsegmentation' },
    ],
    correct_answer: 'A',
  },
  {
    id: 277,
    type: 'multiple_choice',
    question_text:
      'After installing a new 6E wireless router in a small office, a technician notices that some wireless devices are not able to achieve the rated speeds. Which of the following should the technician check to troubleshoot the issue? (Choose two.)',
    options: [
      { letter: 'A', text: 'Client device compatibility' },
      { letter: 'B', text: 'Back-end cabling' },
      { letter: 'C', text: 'Weather phenomena' },
      { letter: 'D', text: 'Voltage source requirements' },
      { letter: 'E', text: 'Interference levels' },
      { letter: 'F', text: 'Processing power' },
    ],
    correct_answer: ['A', 'E'],
  },
  {
    id: 278,
    type: 'multiple_choice',
    question_text:
      'Which of the following routing protocols needs to have an autonomous system set in order to establish communication with neighbor devices?',
    options: [
      { letter: 'A', text: 'OSPF' },
      { letter: 'B', text: 'EIGRP' },
      { letter: 'C', text: 'FHRP' },
      { letter: 'D', text: 'RIP' },
    ],
    correct_answer: 'B',
  },
  {
    id: 279,
    type: 'multiple_choice',
    question_text:
      'An investment bank is seeking a DR backup solution. Which of the following provides the most cost-effective backup site?',
    options: [
      { letter: 'A', text: 'Hot' },
      { letter: 'B', text: 'Cold' },
      { letter: 'C', text: 'Cluster' },
      { letter: 'D', text: 'Warm' },
    ],
    correct_answer: 'B',
  },
  {
    id: 280,
    type: 'multiple_choice',
    question_text:
      "A firewall administrator is mapping a server's internal IP address to an external IP address for public use. Which of the following is the name of this function?",
    options: [
      { letter: 'A', text: 'NAT' },
      { letter: 'B', text: 'VIP' },
      { letter: 'C', text: 'PAT' },
      { letter: 'D', text: 'BGP' },
    ],
    correct_answer: 'A',
  },
  {
    id: 281,
    type: 'multiple_choice',
    question_text:
      'A network engineer is completing a new VoIP installation, but the phones cannot find the TFTP server to download the configuration files. Which of the following DHCP features would help the phone reach the TFTP server?',
    options: [
      { letter: 'A', text: 'Exclusions' },
      { letter: 'B', text: 'Lease time' },
      { letter: 'C', text: 'Options' },
      { letter: 'D', text: 'Scope' },
    ],
    correct_answer: 'C',
  },
  {
    id: 282,
    type: 'multiple_choice',
    question_text:
      'Which of the following best represents north-south traffic?',
    options: [
      {
        letter: 'A',
        text: 'A connection between a computer and a public web server',
      },
      { letter: 'B', text: 'Data moving between a data center and a DR site' },
      {
        letter: 'C',
        text: 'Traffic between a production server and a backup server',
      },
      { letter: 'D', text: 'Routing updates between OSPF routers' },
    ],
    correct_answer: 'A',
  },
  {
    id: 283,
    type: 'multiple_choice',
    question_text:
      'Which of the following provides an opportunity for an on-path attack?',
    options: [
      { letter: 'A', text: 'Phishing' },
      { letter: 'B', text: 'Dumpster diving' },
      { letter: 'C', text: 'Evil twin' },
      { letter: 'D', text: 'Tailgating' },
    ],
    correct_answer: 'C',
  },
  {
    id: 284,
    type: 'multiple_choice',
    question_text:
      'A network administrator is configuring a network for a new site that will have 150 users. Within the next year, the site is expected to grow by ten uses. Each user will have two IP addresses, one computer, and one phone connected to the network. Which of the following classful IPv4 address ranges will be best-suited for the network?',
    options: [
      { letter: 'A', text: 'Class D' },
      { letter: 'B', text: 'Class B' },
      { letter: 'C', text: 'Class A' },
      { letter: 'D', text: 'Class C' },
    ],
    correct_answer: 'D',
  },
  {
    id: 285,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to assign IP addresses to a newly installed network. They choose 192.168.1.0/24 as their network address and need to create three subnets with 30 hosts on each subnet. Which of the following is a valid subnet mask that will meet the requirements?',
    options: [
      { letter: 'A', text: '255.255.255.128' },
      { letter: 'B', text: '255.255.255.192' },
      { letter: 'C', text: '255.255.255.224' },
      { letter: 'D', text: '255.255.255.240' },
    ],
    correct_answer: 'C',
  },
  {
    id: 286,
    type: 'multiple_choice',
    question_text:
      'The network engineering team needs to implement a wireless network within two separate buildings. Once the network is set up, users will need to authenticate using RADIUS in order to access internal resources. Which of the following wireless technologies should the team implement?',
    options: [
      { letter: 'A', text: 'Mesh' },
      { letter: 'B', text: 'Enterprise' },
      { letter: 'C', text: 'Ad hoc' },
      { letter: 'D', text: 'Point to point' },
    ],
    correct_answer: 'B',
  },
  {
    id: 287,
    type: 'multiple_choice',
    question_text:
      'A network engineer discovers network traffic that is sending confidential information to an unauthorized and unknown destination. Which of the following best describes the cause of this network traffic?',
    options: [
      { letter: 'A', text: 'Ransomware' },
      { letter: 'B', text: 'Darkware' },
      { letter: 'C', text: 'Malware' },
      { letter: 'D', text: 'Adware' },
    ],
    correct_answer: 'C',
  },
  {
    id: 288,
    type: 'multiple_choice',
    question_text:
      'A security administrator is looking for rogue servers on the network and would also like to determine which services are running on those servers. Which of the following software tools should the administrator use?',
    options: [
      { letter: 'A', text: 'tracert' },
      { letter: 'B', text: 'nmap' },
      { letter: 'C', text: 'netstat' },
      { letter: 'D', text: 'ping' },
    ],
    correct_answer: 'B',
  },
  {
    id: 289,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to secure SNMP access with authentication and encryption. Which of the following should the administrator use?',
    options: [
      { letter: 'A', text: 'SNMPv3' },
      { letter: 'B', text: 'SNMP community string' },
      { letter: 'C', text: 'SNMP ACL access group' },
      { letter: 'D', text: 'SNMPv2c' },
    ],
    correct_answer: 'A',
  },
  {
    id: 290,
    type: 'multiple_choice',
    question_text:
      "A user's desk has a workstation and an IP phone. The user is unable to browse the internet on the workstation, but the phone works. Which of the following configurations is required?",
    options: [
      { letter: 'A', text: 'Voice VLAN' },
      { letter: 'B', text: 'Native VLAN' },
      { letter: 'C', text: 'Data VLAN' },
      { letter: 'D', text: 'Trunk port' },
    ],
    correct_answer: 'C',
  },
  {
    id: 291,
    type: 'multiple_choice',
    question_text:
      "A network technician is configuring the company's network 100Mbps port Layer 2 switches. The technician wants increased throughput for the uplinks between switches. The technician connects multiple redundant links between the switches. Which of the following should the technician configure?",
    options: [
      { letter: 'A', text: 'Spanning Tree Protocol' },
      { letter: 'B', text: 'Switch Virtual Interfaces' },
      { letter: 'C', text: 'Native VLAN' },
      { letter: 'D', text: 'First Hop Redundancy Protocol' },
    ],
    correct_answer: 'A',
  },
  {
    id: 292,
    type: 'multiple_choice',
    question_text:
      'Which of the following would most likely be utilized to implement encryption in transit when using HTTPS?',
    options: [
      { letter: 'A', text: 'SSH' },
      { letter: 'B', text: 'TLS' },
      { letter: 'C', text: 'SCADA' },
      { letter: 'D', text: 'RADIUS' },
    ],
    correct_answer: 'B',
  },
  {
    id: 293,
    type: 'multiple_choice',
    question_text:
      'Some of the 20 employees who use the wireless network report they are unable to access network resources even though the wireless network is available. An administrator recently made the following configuration changes to the wireless DHCP server:\nNetwork: 192.168.100.0\nMask: 255.255.255.240\nGateway: 192.168.100.1\nWhich of the following is the cause of this issue?',
    options: [
      { letter: 'A', text: 'Incorrect VLAN assignment' },
      { letter: 'B', text: 'Incorrect ACL configuration' },
      { letter: 'C', text: 'Incorrect subnet mask' },
      { letter: 'D', text: 'Incorrect default gateway' },
    ],
    correct_answer: 'C',
  },
  {
    id: 294,
    type: 'multiple_choice',
    question_text:
      'Which of the following typically uses compromised systems that become part of a bot network?',
    options: [
      { letter: 'A', text: 'Evil twin attack' },
      { letter: 'B', text: 'DDoS attack' },
      { letter: 'C', text: 'XML injection' },
      { letter: 'D', text: 'Brute-force password attack' },
    ],
    correct_answer: 'B',
  },
  {
    id: 295,
    type: 'multiple_choice',
    question_text:
      'Which of the following network ports is used when a client accesses an SFTP server?',
    options: [
      { letter: 'A', text: '22' },
      { letter: 'B', text: '80' },
      { letter: 'C', text: '443' },
      { letter: 'D', text: '3389' },
    ],
    correct_answer: 'A',
  },
  {
    id: 296,
    type: 'multiple_choice',
    question_text:
      'Two companies successfully merged. Following the merger, a network administrator identified a connection bottleneck. The newly formed company plans to acquire a high-end 40GB switch and redesign the network from a three-tier model to a collapsed core. Which of the following should the administrator do until the new devices are acquired?',
    options: [
      { letter: 'A', text: 'Implement the FHRP.' },
      { letter: 'B', text: 'Configure a route selection metric change.' },
      { letter: 'C', text: 'Install a load balancer.' },
      { letter: 'D', text: 'Enable link aggregation.' },
    ],
    correct_answer: 'D',
  },
  {
    id: 297,
    type: 'multiple_choice',
    question_text:
      'Which of the following is the step that a troubleshooter should take immediately after implementing a solution?',
    options: [
      { letter: 'A', text: 'Review lessons learned during the process.' },
      { letter: 'B', text: 'Establish a plan of action.' },
      { letter: 'C', text: 'Verify full system functionality.' },
      { letter: 'D', text: 'Document actions and outcomes.' },
    ],
    correct_answer: 'C',
  },
  {
    id: 298,
    type: 'multiple_choice',
    question_text:
      'Users can usually use RDP to connect to a terminal server with hostname TS19 that points to 10.0.100.19. However, users recently have been unable to connect to TS19. The technician pings 10.0.100.19 and gets an unreachable error. Which of the following is the most likely cause?',
    options: [
      { letter: 'A', text: 'The users are on the wrong subnet.' },
      { letter: 'B', text: 'The DHCP server renewed the lease.' },
      { letter: 'C', text: 'The IP address was not reserved.' },
      { letter: 'D', text: 'The hostname was changed.' },
    ],
    correct_answer: 'C',
  },
  {
    id: 299,
    type: 'multiple_choice',
    question_text:
      'Which of the following is the OSI model layer that uses a connectionless protocol for packet delivery?',
    options: [
      { letter: 'A', text: 'Physical' },
      { letter: 'B', text: 'Network' },
      { letter: 'C', text: 'Transport' },
      { letter: 'D', text: 'Application' },
    ],
    correct_answer: 'B',
  },
  {
    id: 300,
    type: 'multiple_choice',
    question_text:
      'A company experiences an incident involving a user who connects an unmanaged switch to the network. Which of the following technologies should the company implement to help avoid similar incidents without conducting an asset inventory?',
    options: [
      { letter: 'A', text: 'Screened subnet' },
      { letter: 'B', text: '802.1X' },
      { letter: 'C', text: 'MAC filtering' },
      { letter: 'D', text: 'Port security' },
    ],
    correct_answer: 'D',
  },
  // ... 201-250
  {
    id: 201,
    type: 'multiple_choice',
    question_text:
      'Which of the following steps in the troubleshooting methodology comes after using a top-to-bottom examination of the OSI model to determine cause?',
    options: [
      { letter: 'A', text: 'Test the theory.' },
      { letter: 'B', text: 'Establish a plan of action.' },
      { letter: 'C', text: 'Verify full system functionality.' },
      { letter: 'D', text: 'Identify the problem.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 202,
    type: 'multiple_choice',
    question_text:
      'Which of the following would an adversary do while conducting an evil twin attack?',
    options: [
      {
        letter: 'A',
        text: 'Trick users into using an AP with an SSID that is identical to a legitimate network.',
      },
      {
        letter: 'B',
        text: 'Manipulate address resolution to point devices to a malicious endpoint.',
      },
      {
        letter: 'C',
        text: 'Present an identical MAC to gain unauthorized access to network resources.',
      },
      {
        letter: 'D',
        text: 'Capture data in transit between two legitimate endpoints to steal data.',
      },
    ],
    correct_answer: 'A',
  },
  {
    id: 203,
    type: 'multiple_choice',
    question_text:
      'An ISP provided a company with an IP range of 98.174.235.142/28. A network technician configured a router with a subnet mask of 255.255.255.224 and default gateway of 98.174.235.129. After the configuration was set up, the company is unable to connect to the ISP. Which of the following would resolve this issue?',
    options: [
      { letter: 'A', text: 'Change the subnet mask to .240.' },
      {
        letter: 'B',
        text: 'Change the Ethernet cable from the external interface to the modem.',
      },
      { letter: 'C', text: 'Change the CIDR to /29.' },
      { letter: 'D', text: 'Change the static IP to 98.174.235.128/28.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 204,
    type: 'multiple_choice',
    question_text:
      'A network administrator is troubleshooting a connection between two switches that is experiencing intermittent errors. The administrator needs to determine which port on the remote switch the faulty cable is connected to. Which of the following is the best tool to use to identify the error?',
    options: [
      { letter: 'A', text: 'tracert' },
      { letter: 'B', text: 'LLDP run' },
      { letter: 'C', text: 'nmap' },
      { letter: 'D', text: 'ping' },
    ],
    correct_answer: 'B',
  },
  {
    id: 205,
    type: 'multiple_choice',
    question_text:
      'Which of the following is a difference between EOL and EOS?',
    options: [
      {
        letter: 'A',
        text: 'EOL discontinues the product but may offer support.',
      },
      {
        letter: 'B',
        text: 'EOS replaces free support with a subscription model.',
      },
      { letter: 'C', text: 'EOS only applies to physical products.' },
      { letter: 'D', text: 'EOL still guarantees warranty service.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 206,
    type: 'multiple_choice',
    question_text:
      'A network architect is implementing an off-premises computing facility and needs to ensure that operation will not be impacted by major outages. Which of the following should the architect consider?',
    options: [
      { letter: 'A', text: 'Hot site' },
      { letter: 'B', text: 'DCI' },
      { letter: 'C', text: 'Direct Connect' },
      { letter: 'D', text: 'Active-passive approach' },
    ],
    correct_answer: 'A',
  },
  {
    id: 207,
    type: 'multiple_choice',
    question_text:
      'A network engineer is testing a website to ensure it is compatible with IPv6. After attempting to ping the website by its IPv6 address, the engineer determines that the DNS has not been set up properly. Which of the following should the network engineer complete to resolve this issue?',
    options: [
      { letter: 'A', text: 'Enable a PTR record.' },
      { letter: 'B', text: 'Update the existing TXT record.' },
      { letter: 'C', text: 'Add a new AAAA record.' },
      { letter: 'D', text: 'Configure a secondary NS record.' },
    ],
    correct_answer: 'C',
  },
  {
    id: 208,
    type: 'multiple_choice',
    question_text:
      'A small coffee shop wants to set up multiple 2.4GHz wireless access points. The access points will support a large number of users, and the network technician wants to mitigate interference as much as possible. Which of the following is the number of 22MHz channels that the equipment can support?',
    options: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '3' },
      { letter: 'D', text: '4' },
    ],
    correct_answer: 'C',
  },
  {
    id: 209,
    type: 'multiple_choice',
    question_text:
      'A company is purchasing a 40Gbps broadband connection service from an ISP. Which of the following should most likely be configured on the 10G switch to take advantage of the new service?',
    options: [
      { letter: 'A', text: '802.11Q tagging' },
      { letter: 'B', text: 'Jumbo frames' },
      { letter: 'C', text: 'Half duplex' },
      { letter: 'D', text: 'Link aggregation' },
    ],
    correct_answer: 'D',
  },
  {
    id: 210,
    type: 'multiple_choice',
    question_text:
      'Which of the following are the main differences between ESP and AH? (Choose two.)',
    options: [
      {
        letter: 'A',
        text: 'AH provides confidentiality through the use of encryption.',
      },
      {
        letter: 'B',
        text: 'ESP provides authentication for IP headers and their payloads.',
      },
      {
        letter: 'C',
        text: 'ESP provides confidentiality through the use of encryption.',
      },
      {
        letter: 'D',
        text: 'AH provides authentication for IP headers and their payloads.',
      },
      {
        letter: 'E',
        text: 'AH provides data origin authorization over shared secret.',
      },
      {
        letter: 'F',
        text: 'ESP provides data origin authorization over shared secret.',
      },
    ],
    correct_answer: ['C', 'D'],
  },
  {
    id: 211,
    type: 'multiple_choice',
    question_text:
      'An organization wants to ensure that incoming emails were sent from a trusted source. Which of the following DNS records is used to verify the source?',
    options: [
      { letter: 'A', text: 'TXT' },
      { letter: 'B', text: 'AAA' },
      { letter: 'C', text: 'CNAME' },
      { letter: 'D', text: 'MX' },
    ],
    correct_answer: 'A',
  },
  {
    id: 212,
    type: 'multiple_choice',
    question_text:
      'Which of the following is the most closely associated with segmenting compute resources within a single cloud account?',
    options: [
      { letter: 'A', text: 'Network security group' },
      { letter: 'B', text: 'IaaS' },
      { letter: 'C', text: 'VPC' },
      { letter: 'D', text: 'Hybrid cloud' },
    ],
    correct_answer: 'C',
  },
  {
    id: 213,
    type: 'multiple_choice',
    question_text:
      'Which of the following is the most likely function to be decremented when a tool is used to measure the distance between two locations on the internet?',
    options: [
      { letter: 'A', text: 'GRE' },
      { letter: 'B', text: 'TTL' },
      { letter: 'C', text: 'VPN' },
      { letter: 'D', text: 'QoS' },
    ],
    correct_answer: 'B',
  },
  {
    id: 214,
    type: 'multiple_choice',
    question_text:
      "A user's home mesh wireless network is experiencing latency issues. A technician has:\n- Performed a speed test.\n- Rebooted the devices.\n- Performed a site survey.\n- Performed a wireless packet capture.\nThe technician reviews the following information:\nSSID, MAC, RSSI, Channel\nHome, AAAAAA111112, -83dBm, 11\nHome, AAAAAA111113, -91dBm, 11\nHome, AAAAAA111114, -70dBm, 11\nThe technician notices in the packet capture that frames were retransmitted. Which of the following is the most likely cause of the user's network issue?",
    options: [
      { letter: 'A', text: 'The SSIDs should not be the same.' },
      { letter: 'B', text: 'The network has too much overlap.' },
      {
        letter: 'C',
        text: 'The devices are incompatible with the mesh network.',
      },
      { letter: 'D', text: 'The nodes are underpowered.' },
    ],
    correct_answer: 'B',
  },
  {
    id: 215,
    type: 'multiple_choice',
    question_text:
      'A network engineer implements a 192.168.100.0/25 subnet for a building without obtaining sizing requirements. It is later determined that the building will house 700 people. Which of the following subnet masks will most efficiently support that number of people?',
    options: [
      { letter: 'A', text: '255.255.252.0' },
      { letter: 'B', text: '255.255.254.0' },
      { letter: 'C', text: '255.255.255.0' },
      { letter: 'D', text: '255.255.255.128' },
    ],
    correct_answer: 'A',
  },
  {
    id: 216,
    type: 'multiple_choice',
    question_text:
      'A company is building a new campus that will have wired and wireless devices. The network will be designed to support casual internet usage for guests and break rooms for employees. Which of the following authentication methods is best suited for guests given the requirements of this scenario?',
    options: [
      { letter: 'A', text: 'ESP' },
      { letter: 'B', text: 'PSK' },
      { letter: 'C', text: 'WPA' },
      { letter: 'D', text: 'IKE' },
    ],
    correct_answer: 'B',
  },
  {
    id: 217,
    type: 'multiple_choice',
    question_text:
      'Following the troubleshooting methodology, a technician implements a solution that resolves the reported issue. Which of the following should the technician do next?',
    options: [
      { letter: 'A', text: 'Document the findings.' },
      { letter: 'B', text: 'Create a plan of action.' },
      { letter: 'C', text: 'Establish a theory.' },
      { letter: 'D', text: 'Identify the problem.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 218,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to divide 192.168.1.0/24 into two equal halves. Which of the following subnet masks should the administrator use?',
    options: [
      { letter: 'A', text: '255.255.0.0' },
      { letter: 'B', text: '255.255.254.0' },
      { letter: 'C', text: '255.255.255.0' },
      { letter: 'D', text: '255.255.255.128' },
    ],
    correct_answer: 'D',
  },
  {
    id: 219,
    type: 'multiple_choice',
    question_text:
      "Which of the following protocols uses the Dijkstra's Link State Algorithm to establish routes inside its routing table?",
    options: [
      { letter: 'A', text: 'OSPF' },
      { letter: 'B', text: 'EIGRP' },
      { letter: 'C', text: 'BGP' },
      { letter: 'D', text: 'RIP' },
    ],
    correct_answer: 'A',
  },
  {
    id: 220,
    type: 'multiple_choice',
    question_text:
      'Which of the following traffic types does a DHCP Discover request from a PC use?',
    options: [
      { letter: 'A', text: 'Broadcast' },
      { letter: 'B', text: 'Anycast' },
      { letter: 'C', text: 'Unicast' },
      { letter: 'D', text: 'Multicast' },
    ],
    correct_answer: 'A',
  },
  {
    id: 221,
    type: 'multiple_choice',
    question_text:
      "A user's VoIP phone and workstation are connected through an inline cable. The user reports that the VoIP phone intermittently reboots, but the workstation is not having any network-related issues. Which of the following is the most likely cause?",
    options: [
      { letter: 'A', text: 'The PoE power budget is exceeded.' },
      { letter: 'B', text: 'Port security is violated.' },
      { letter: 'C', text: 'The signal is degraded.' },
      { letter: 'D', text: 'The Ethernet cable is not working.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 222,
    type: 'multiple_choice',
    question_text:
      'A network administrator is installing a network for a small company. The switches will be installed in parallel to provide redundancy in case a specific device fails. Which of the following should be configured to prevent loops?',
    options: [
      { letter: 'A', text: 'Spanning tree' },
      { letter: 'B', text: 'CRC' },
      { letter: 'C', text: 'Jumbo frames' },
      { letter: 'D', text: 'Link aggregation' },
    ],
    correct_answer: 'A',
  },
  {
    id: 223,
    type: 'multiple_choice',
    question_text:
      "A company's network is experiencing high latency and packet loss during peak hours. Network monitoring tools show increased traffic on a switch. Which of the following should a network technician implement to reduce the network congestion and improve performance?",
    options: [
      { letter: 'A', text: 'Load balancing' },
      { letter: 'B', text: 'Port mirroring' },
      { letter: 'C', text: 'Quality of service' },
      { letter: 'D', text: 'Spanning Tree Protocol' },
    ],
    correct_answer: 'C',
  },
  {
    id: 224,
    type: 'multiple_choice',
    question_text:
      'Which of the following VPN types provides secure remote access to the network resources through a web portal?',
    options: [
      { letter: 'A', text: 'Proxy' },
      { letter: 'B', text: 'Clientless' },
      { letter: 'C', text: 'Site-to-site' },
      { letter: 'D', text: 'Direct connect' },
    ],
    correct_answer: 'B',
  },
  {
    id: 225,
    type: 'multiple_choice',
    question_text:
      'Which of the following best explains the role of confidentiality with regard to data at rest?',
    options: [
      {
        letter: 'A',
        text: 'Data can be accessed by anyone on the administrative network.',
      },
      {
        letter: 'B',
        text: 'Data can be accessed remotely with proper training.',
      },
      {
        letter: 'C',
        text: 'Data can be accessed after privileged access is granted.',
      },
      { letter: 'D', text: 'Data can be accessed after verifying the hash.' },
    ],
    correct_answer: 'C',
  },
  {
    id: 226,
    type: 'multiple_choice',
    question_text:
      "Several users in an organization report connectivity issues and lag during a video meeting. The network administrator performs a tcpdump and observes increased retransmissions for other non-video applications on the network. Which of the following symptoms describes the users' reported issues?",
    options: [
      { letter: 'A', text: 'Latency' },
      { letter: 'B', text: 'Packet loss' },
      { letter: 'C', text: 'Bottlenecking' },
      { letter: 'D', text: 'Jitter' },
    ],
    correct_answer: 'B',
  },
  {
    id: 227,
    type: 'multiple_choice',
    question_text:
      'An administrator enables DNS filtering on the firewall to block users from visiting malicious websites. Which of the following should the administrator also do? (Choose two.)',
    options: [
      { letter: 'A', text: "Disable DoH in users' internet browsers." },
      { letter: 'B', text: 'Update NS record to point to DNS filter servers.' },
      { letter: 'C', text: 'Block port 443 to the malicious websites.' },
      { letter: 'D', text: 'Block port 53 to servers on the internet.' },
      { letter: 'E', text: "Disable TLS v1.3 in users' internet browsers." },
      { letter: 'F', text: 'Implement DNSSEC for corporate records.' },
    ],
    correct_answer: ['A', 'F'],
  },
  {
    id: 228,
    type: 'multiple_choice',
    question_text:
      'Which of the following is concerned with guaranteed availably of a cloud resource?',
    options: [
      { letter: 'A', text: 'IPAM' },
      { letter: 'B', text: 'SLA' },
      { letter: 'C', text: 'MTBF' },
      { letter: 'D', text: 'EOL' },
    ],
    correct_answer: 'B',
  },
  {
    id: 229,
    type: 'multiple_choice',
    question_text:
      'A network consultant needs to decide between running an Ethernet uplink or using the built-in 5GHz point-to-point functionality on a WAP. Which of the following documents provides the best information to assist the consultant with this decision?',
    options: [
      { letter: 'A', text: 'Site survey results' },
      { letter: 'B', text: 'Physical diagram' },
      { letter: 'C', text: 'Service-level agreement' },
      { letter: 'D', text: 'Logical diagram' },
    ],
    correct_answer: 'A',
  },
  {
    id: 230,
    type: 'multiple_choice',
    question_text:
      "While troubleshooting connectivity issues, a junior network administrator is given explicit instructions to test the host's TCP/IP stack first. Which of the following commands should the network administrator run?",
    options: [
      { letter: 'A', text: 'ping 127.0.0.1' },
      { letter: 'B', text: 'ping 169.254.1.1' },
      { letter: 'C', text: 'ping 172.16.1.1' },
      { letter: 'D', text: 'ping 192.168.1.1' },
    ],
    correct_answer: 'A',
  },
  {
    id: 231,
    type: 'multiple_choice',
    question_text:
      "Users at an organization report that the wireless network is not working in some areas of the building. Users report that other wireless network SSIDs are visible when searching for the network, but the organization's network is not displayed. Which of the following is the most likely cause?",
    options: [
      { letter: 'A', text: 'Interference or channel overlap' },
      { letter: 'B', text: 'Insufficient wireless coverage' },
      { letter: 'C', text: 'Roaming misconfiguration' },
      { letter: 'D', text: 'Client disassociation issues' },
    ],
    correct_answer: 'B',
  },
  {
    id: 232,
    type: 'multiple_choice',
    question_text:
      'Which of the following panels would be best to facilitate a central termination point for all network cables on the floor of a company building?',
    options: [
      { letter: 'A', text: 'Patch' },
      { letter: 'B', text: 'UPS' },
      { letter: 'C', text: 'MDF' },
      { letter: 'D', text: 'Rack' },
    ],
    correct_answer: 'A',
  },
  {
    id: 233,
    type: 'multiple_choice',
    question_text:
      'Which of the following is most commonly associated with many systems sharing one IP address in the public IP-addressing space?',
    options: [
      { letter: 'A', text: 'PAT' },
      { letter: 'B', text: 'NAT' },
      { letter: 'C', text: 'VIP' },
      { letter: 'D', text: 'NAT64' },
    ],
    correct_answer: 'A',
  },
  {
    id: 234,
    type: 'multiple_choice',
    question_text:
      'A network administrator is reviewing a production web server and observes the following output from the netstat command:\n[netstat output showing listening ports 22, 25, 53, 80, 123, 643]\nWhich of the following actions should the network administrator take to harden the security of the web server?',
    options: [
      { letter: 'A', text: 'Disable the unused ports.' },
      { letter: 'B', text: 'Enforce access control lists.' },
      { letter: 'C', text: 'Perform content filtering.' },
      { letter: 'D', text: 'Set up a screened subnet.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 235,
    type: 'multiple_choice',
    question_text:
      'A network technician is examining the configuration on an access port and notices more than one VLAN has been set. Which of the following best describes how the port is configured?',
    options: [
      { letter: 'A', text: 'With a voice VLAN' },
      { letter: 'B', text: 'With too many VLAN' },
      { letter: 'C', text: 'With a default VLAN' },
      { letter: 'D', text: 'With a native VLAN' },
    ],
    correct_answer: 'A',
  },
  {
    id: 236,
    type: 'multiple_choice',
    question_text:
      "A small company has the following IP addressing strategy:\nUser subnet: 192.168.1.0/24\nVoice subnet: 192.168.2.0/24\nServer subnet: 192.168.10.0/24\nA user is unable to connect to the company fileshare server located at 192.168.10.1. The user's networking configuration is:\nIPv4 Address: 192.168.1.50\nSubnet Mask: 255.255.0.0\nDefault Gateway: 192.168.10.200\nWhich of the following will most likely correct the issue?",
    options: [
      { letter: 'A', text: 'Changing the IPv4 address to 192.168.10.1' },
      { letter: 'B', text: 'Changing the subnet mask to 255.255.255.0' },
      { letter: 'C', text: 'Changing the DNS servers to internet IPs' },
      {
        letter: 'D',
        text: 'Changing the physical address to 7A-01-7A-21-01-50',
      },
    ],
    correct_answer: 'B',
  },
  {
    id: 237,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to connect a department to a new network segment. They need to use a DHCP server located on another network. Which of the following can the administrator use to complete this task?',
    options: [
      { letter: 'A', text: 'IP Helper' },
      { letter: 'B', text: 'Reservation' },
      { letter: 'C', text: 'Exclusion' },
      { letter: 'D', text: 'Scope' },
    ],
    correct_answer: 'A',
  },
  {
    id: 238,
    type: 'multiple_choice',
    question_text:
      'A network engineer is implementing a solution by which on-premises servers are migrated to a cloud service provider. Which of the following service models will provide a lift and shift solution to meet this requirement?',
    options: [
      { letter: 'A', text: 'Infrastructure as a service' },
      { letter: 'B', text: 'Infrastructure as code' },
      { letter: 'C', text: 'Software as a service' },
      { letter: 'D', text: 'Software-defined network' },
    ],
    correct_answer: 'A',
  },
  {
    id: 239,
    type: 'multiple_choice',
    question_text:
      'A network administrator is conducting an assessment and found network devices that do not meet standards. Which of the following configurations is considered a set of rules that devices should adhere to?',
    options: [
      { letter: 'A', text: 'Production' },
      { letter: 'B', text: 'Backup' },
      { letter: 'C', text: 'Candidate' },
      { letter: 'D', text: 'Golden' },
    ],
    correct_answer: 'D',
  },
  {
    id: 240,
    type: 'multiple_choice',
    question_text:
      'An IT department asks a newly hired employee to use a personal laptop until the company can provide one. Which of the following policies is most applicable to this situation?',
    options: [
      { letter: 'A', text: 'IAM' },
      { letter: 'B', text: 'BYOD' },
      { letter: 'C', text: 'DLP' },
      { letter: 'D', text: 'AUP' },
    ],
    correct_answer: 'B',
  },
  {
    id: 241,
    type: 'multiple_choice',
    question_text:
      'Which of the following offers the ability to manage access at the cloud VM instance?',
    options: [
      { letter: 'A', text: 'Security group' },
      { letter: 'B', text: 'Internet gateway' },
      { letter: 'C', text: 'Direct Connect' },
      { letter: 'D', text: 'Network ACL' },
    ],
    correct_answer: 'A',
  },
  {
    id: 242,
    type: 'multiple_choice',
    question_text:
      'In an environment with one router, which of the following will allow a network engineer to communicate between VLANs without purchasing additional hardware?',
    options: [
      { letter: 'A', text: 'Subinterfaces' },
      { letter: 'B', text: 'VXLAN' },
      { letter: 'C', text: 'Layer 3 switch' },
      { letter: 'D', text: 'VIP' },
    ],
    correct_answer: 'A',
  },
  {
    id: 243,
    type: 'multiple_choice',
    question_text:
      'A network administrator is concerned with on-path attacks and wants to provide encryption of fully qualified domain names in outbound communications. Which of the following best describes the protocol that provides the proper security layer for internet communication?',
    options: [
      { letter: 'A', text: 'SSL' },
      { letter: 'B', text: 'DoH' },
      { letter: 'C', text: 'TLS' },
      { letter: 'D', text: 'DNSSEC' },
    ],
    correct_answer: 'B',
  },
  {
    id: 244,
    type: 'multiple_choice',
    question_text:
      'A network administrator wants to restrict inbound traffic to allow only HTTPS to the company website, denying all other inbound traffic from the internet. Which of the following would best accomplish this goal?',
    options: [
      { letter: 'A', text: 'ACL on the edge firewall' },
      { letter: 'B', text: 'Port security on an access switch' },
      { letter: 'C', text: 'Content filtering on a web gateway' },
      { letter: 'D', text: 'URL filtering on an outbound proxy' },
    ],
    correct_answer: 'A',
  },
  {
    id: 245,
    type: 'multiple_choice',
    question_text:
      'A network engineer is deploying switches at a new remote office. The switches have been preconfigured with hostnames and STP priority values. Based on the following table:\nHostname, MAC address, STP priority\ncore-sw01, 0000.0000.005f, 4096\ndistribution-sw01, 0000.0000.001a, 32768\naccess-sw01, 0000.0000.005e, 4096\naccess-sw02, 0000.0000.001b, 32768\nWhich of the following switches will become the root bridge?',
    options: [
      { letter: 'A', text: 'core-sw01' },
      { letter: 'B', text: 'access-sw01' },
      { letter: 'C', text: 'distribution-sw01' },
      { letter: 'D', text: 'access-sw02' },
    ],
    correct_answer: 'B',
  },
  {
    id: 246,
    type: 'multiple_choice',
    question_text:
      "Which of following must be implemented to securely connect a company's headquarters with a branch location?",
    options: [
      { letter: 'A', text: 'Split-tunnel VPN' },
      { letter: 'B', text: 'Clientless VPN' },
      { letter: 'C', text: 'Full-tunnel VPN' },
      { letter: 'D', text: 'Site-to-site VPN' },
    ],
    correct_answer: 'D',
  },
  {
    id: 247,
    type: 'multiple_choice',
    question_text:
      'A network engineer needs to virtualize network services, including a router, at a remote branch location. Which of the following solutions meets the requirements?',
    options: [
      { letter: 'A', text: 'NFV' },
      { letter: 'B', text: 'VRF' },
      { letter: 'C', text: 'VLAN' },
      { letter: 'D', text: 'VPC' },
    ],
    correct_answer: 'A',
  },
  {
    id: 248,
    type: 'multiple_choice',
    question_text:
      "A group of users cannot connect to network resources. The technician runs ipconfig from one user's device and is able to ping the gateway shown from the command. Which of the following is most likely preventing the users from accessing network resources?",
    options: [
      { letter: 'A', text: 'VLAN hopping' },
      { letter: 'B', text: 'Rogue DHCP' },
      { letter: 'C', text: 'Distributed DoS' },
      { letter: 'D', text: 'Evil twin' },
    ],
    correct_answer: 'B',
  },
  {
    id: 249,
    type: 'multiple_choice',
    question_text:
      'Which of the following disaster recovery concepts is calculated by dividing the total hours of operation by the total number of units?',
    options: [
      { letter: 'A', text: 'MTTR' },
      { letter: 'B', text: 'MTBF' },
      { letter: 'C', text: 'RPO' },
      { letter: 'D', text: 'RTO' },
    ],
    correct_answer: 'B',
  },
  {
    id: 250,
    type: 'multiple_choice',
    question_text:
      "A network administrator has been monitoring the company's servers to ensure that they are available. Which of the following should the administrator use for this task?",
    options: [
      { letter: 'A', text: 'Packet capture' },
      { letter: 'B', text: 'Data usage reports' },
      { letter: 'C', text: 'SNMP traps' },
      { letter: 'D', text: 'Configuration monitoring' },
    ],
    correct_answer: 'C',
  },
  // ... 301-350
  {
    id: 301,
    type: 'multiple_choice',
    question_text:
      'Which of the following are benefits of implementing MFA and SSO in an enterprise environment? (Choose two.)',
    options: [
      { letter: 'A', text: 'Eliminating the number of password resets' },
      { letter: 'B', text: 'Centralizing user account management activities' },
      {
        letter: 'C',
        text: 'Adding an extra layer of security against compromised credentials',
      },
      { letter: 'D', text: 'Reducing the overhead of security tokens' },
      { letter: 'E', text: 'Enforcing conditional access policies' },
      {
        letter: 'F',
        text: 'Leveraging threat feed information from external sources',
      },
    ],
    correct_answer: ['B', 'C'],
  },
  {
    id: 302,
    type: 'multiple_choice',
    question_text:
      'Users report connectivity issues after a network switch is replaced. There are three separate subnets for users, voice, and servers. The users cannot reach the resources in the server subnet. Upon investigation, a separate voice switch has thousands of discarded packets, but no users report issues making or receiving calls. Which of the following is most likely the issue?',
    options: [
      { letter: 'A', text: 'Incorrect cable' },
      { letter: 'B', text: 'Port administratively disabled' },
      { letter: 'C', text: 'VLAN misconfiguration' },
      { letter: 'D', text: 'Duplex setting' },
    ],
    correct_answer: 'C',
  },
  {
    id: 303,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to deploy a subnet using an IP address range that can support at least 260 devices with the fewest wasted addresses. Which of the following subnets should the administrator use?',
    options: [
      { letter: 'A', text: '172.16.0.0/24' },
      { letter: 'B', text: '172.25.2.0/23' },
      { letter: 'C', text: '172.30.1.0/22' },
      { letter: 'D', text: '172.33.0.0/21' },
    ],
    correct_answer: 'B',
  },
  {
    id: 304,
    type: 'multiple_choice',
    question_text:
      'Which of the following will allow secure, remote access to internal applications?',
    options: [
      { letter: 'A', text: 'VPN' },
      { letter: 'B', text: 'CDN' },
      { letter: 'C', text: 'SAN' },
      { letter: 'D', text: 'IDS' },
    ],
    correct_answer: 'A',
  },
  {
    id: 305,
    type: 'multiple_choice',
    question_text:
      'A junior network administrator gets a text message from a number posing as the domain registrar of the firm. The administrator is tricked into providing global administrator credentials. Which of the following attacks is taking place?',
    options: [
      { letter: 'A', text: 'DNS poisoning' },
      { letter: 'B', text: 'ARP spoofing' },
      { letter: 'C', text: 'Vishing' },
      { letter: 'D', text: 'Smishing' },
    ],
    correct_answer: 'D',
  },
  {
    id: 306,
    type: 'multiple_choice',
    question_text:
      'A network engineer wants to implement a secure solution that provides authentication and encryption to gather and monitor logs within the company network. Which of the following tools will accomplish this task?',
    options: [
      { letter: 'A', text: 'Syslog' },
      { letter: 'B', text: 'RADIUS' },
      { letter: 'C', text: 'SNMPv3' },
      { letter: 'D', text: 'API' },
    ],
    correct_answer: 'C',
  },
  {
    id: 307,
    type: 'multiple_choice',
    question_text:
      'A tourist attempts to access an online banking site on a mobile device while in a public place. Which of the following is the tourist most likely to experience?',
    options: [
      { letter: 'A', text: 'Vishing' },
      { letter: 'B', text: 'Tailgating' },
      { letter: 'C', text: 'Shoulder surfing' },
      { letter: 'D', text: 'Peripheral attack' },
    ],
    correct_answer: 'C',
  },
  {
    id: 308,
    type: 'multiple_choice',
    question_text:
      'Which of the following is used to separate a corporate network into multiple logical networks?',
    options: [
      { letter: 'A', text: 'Load balancer' },
      { letter: 'B', text: 'VLAN' },
      { letter: 'C', text: 'CDN' },
      { letter: 'D', text: 'IPS' },
    ],
    correct_answer: 'B',
  },
  {
    id: 309,
    type: 'multiple_choice',
    question_text:
      'A medical clinic recently configured a guest wireless network on the existing router. Since then, guests have been changing the music on the speaker system. Which of the following actions should the clinic take to prevent unauthorized access? (Choose two.)',
    options: [
      {
        letter: 'A',
        text: 'Isolate smart devices to their own network segment.',
      },
      {
        letter: 'B',
        text: 'Configure IPS to prevent guests from making changes.',
      },
      { letter: 'C', text: 'Install a new AP on the network.' },
      {
        letter: 'D',
        text: 'Set up a syslog server to log who is making changes.',
      },
      { letter: 'E', text: 'Change the default credentials.' },
      { letter: 'F', text: 'Configure GRE on the wireless router.' },
    ],
    correct_answer: ['A', 'E'],
  },
  {
    id: 310,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to disable all inbound and outbound telnet traffic in the network. Which of the following ports should the administrator disable?',
    options: [
      { letter: 'A', text: '23' },
      { letter: 'B', text: '53' },
      { letter: 'C', text: '123' },
      { letter: 'D', text: '443' },
    ],
    correct_answer: 'A',
  },
  {
    id: 311,
    type: 'multiple_choice',
    question_text:
      'Which of the following stages of the troubleshooting methodology involves considering multiple approaches?',
    options: [
      { letter: 'A', text: 'Verify full functionality.' },
      { letter: 'B', text: 'Implement the solution.' },
      { letter: 'C', text: 'Document the findings and actions.' },
      { letter: 'D', text: 'Establish a theory of probable cause.' },
    ],
    correct_answer: 'D',
  },
  {
    id: 312,
    type: 'multiple_choice',
    question_text:
      'After a recent merger, a large number of alerts are coming in regarding extremely high utilization. Which of the following should be generated to help inform new alerting requirements?',
    options: [
      { letter: 'A', text: 'SLA' },
      { letter: 'B', text: 'Network diagram' },
      { letter: 'C', text: 'Baseline' },
      { letter: 'D', text: 'Heat map' },
    ],
    correct_answer: 'C',
  },
  {
    id: 313,
    type: 'multiple_choice',
    question_text:
      'Which of the following is concerned with guaranteed availability of a cloud resource?',
    options: [
      { letter: 'A', text: 'IPAM' },
      { letter: 'B', text: 'SLA' },
      { letter: 'C', text: 'MTBF' },
      { letter: 'D', text: 'EOL' },
    ],
    correct_answer: 'B',
  },
  {
    id: 314,
    type: 'multiple_choice',
    question_text:
      "A technician is designing a cloud service solution that will accommodate the company's current size, compute capacity, and storage capacity. Which of the following cloud deployment models will fulfill these requirements?",
    options: [
      { letter: 'A', text: 'SaaS' },
      { letter: 'B', text: 'PaaS' },
      { letter: 'C', text: 'IaaS' },
      { letter: 'D', text: 'IaC' },
    ],
    correct_answer: 'C',
  },
  {
    id: 315,
    type: 'multiple_choice',
    question_text:
      'A network administrator deploys several new desk phones and workstation cubicles. Each cubicle has one assigned switchport. The administrator run the following commands:\nswitchport mode access\nswitchport voice vlan 69\nWith which of the following VLANs will the workstation traffic be tagged?',
    options: [
      { letter: 'A', text: 'Private VLAN' },
      { letter: 'B', text: 'Voice VLAN' },
      { letter: 'C', text: 'Native VLAN' },
      { letter: 'D', text: 'Data VLAN' },
    ],
    correct_answer: 'D',
  },
  {
    id: 316,
    type: 'multiple_choice',
    question_text:
      'Which of the following is associated with avoidance, acceptance, mitigation, and transfer?',
    options: [
      { letter: 'A', text: 'Risk' },
      { letter: 'B', text: 'Exploit' },
      { letter: 'C', text: 'Threat' },
      { letter: 'D', text: 'Vulnerability' },
    ],
    correct_answer: 'A',
  },
  {
    id: 317,
    type: 'multiple_choice',
    question_text:
      'Several users report poor performance when accessing shared drives on a file server named File01. While troubleshooting the issue, the network administrator swaps the Ethernet connections between File01 and another server named File02. Shortly thereafter, users report issues with File02, but File01 is no longer an issue. Which of the following is most likely impacting performance?',
    options: [
      { letter: 'A', text: 'Port security' },
      { letter: 'B', text: 'Speed/duplex mismatch' },
      { letter: 'C', text: 'PoE power budget reduction' },
      { letter: 'D', text: 'Keep-alive beacon failure' },
    ],
    correct_answer: 'B',
  },
  {
    id: 318,
    type: 'multiple_choice',
    question_text:
      'A network technician is requesting a fiber patch cord with a connector that is round and twists to install. Which of the following is the proper name of this connector type?',
    options: [
      { letter: 'A', text: 'ST' },
      { letter: 'B', text: 'BNC' },
      { letter: 'C', text: 'SC' },
      { letter: 'D', text: 'LC' },
    ],
    correct_answer: 'A',
  },
  {
    id: 319,
    type: 'multiple_choice',
    question_text:
      'A data center administrator is evaluating the use of jumbo frames within a storage environment. Which of the following describes the best reason to use jumbo frames in the storage environment?',
    options: [
      { letter: 'A', text: 'To reduce device overhead' },
      { letter: 'B', text: 'To report on the current root switch in the STP' },
      { letter: 'C', text: 'To improve routing convergence' },
      { letter: 'D', text: 'To increase drive throughput' },
    ],
    correct_answer: 'A',
  },
  {
    id: 320,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to efficiently deploy 200 systems using RFC1918 addresses. Which of the following networks should the administrator use?',
    options: [
      { letter: 'A', text: '10.10.10.0/8' },
      { letter: 'B', text: '150.200.1.0/24' },
      { letter: 'C', text: '192.168.1.0/24' },
      { letter: 'D', text: '254.169.0.0/24' },
    ],
    correct_answer: 'C',
  },
  {
    id: 321,
    type: 'multiple_choice',
    question_text:
      "An administrator requests a certificate for the company's domain name. In order to prove ownership of the domain, the certificate authority asks the administrator to create a specific DNS record. Which of the following record types is required?",
    options: [
      { letter: 'A', text: 'SOA' },
      { letter: 'B', text: 'MX' },
      { letter: 'C', text: 'NS' },
      { letter: 'D', text: 'TXT' },
    ],
    correct_answer: 'D',
  },
  {
    id: 322,
    type: 'multiple_choice',
    question_text:
      'An organization has four departments that each need access to different resources that do not overlap. Which of the following should a technician configure in order to implement and assign an ACL?',
    options: [
      { letter: 'A', text: 'VLAN' },
      { letter: 'B', text: 'DHCP' },
      { letter: 'C', text: 'VPN' },
      { letter: 'D', text: 'STP' },
    ],
    correct_answer: 'A',
  },
  {
    id: 323,
    type: 'multiple_choice',
    question_text:
      'A network analyst is installing a wireless network in a corporate environment. Employees are required to use their domain identities and credentials to authenticate and connect to the WLAN. Which of the following actions should the analyst perform on the AP to fulfill the requirements?',
    options: [
      { letter: 'A', text: 'Enable MAC security.' },
      { letter: 'B', text: 'Generate a PSK for each user.' },
      { letter: 'C', text: 'Implement WPS.' },
      { letter: 'D', text: 'Set up WPA3 protocol.' },
    ],
    correct_answer: 'D',
  },
  {
    id: 324,
    type: 'multiple_choice',
    question_text:
      'A network administrator is configuring a wireless connection between two warehouses. Which of the following wireless network types would best accomplish this task?',
    options: [
      { letter: 'A', text: 'Ad hoc' },
      { letter: 'B', text: 'Infrastructure' },
      { letter: 'C', text: 'Point-to-point' },
      { letter: 'D', text: 'Mesh' },
    ],
    correct_answer: 'C',
  },
  {
    id: 325,
    type: 'multiple_choice',
    question_text:
      'A network engineer is designing an internal network that needs to support both IPv4 and IPv6 routing. Which of the following routing protocols is capable of supporting both IPv4 and IPv6?',
    options: [
      { letter: 'A', text: 'OSPFv3' },
      { letter: 'B', text: 'RIPv2' },
      { letter: 'C', text: 'BGP' },
      { letter: 'D', text: 'EIGRP' },
    ],
    correct_answer: 'C',
  },
  {
    id: 326,
    type: 'multiple_choice',
    question_text:
      'While conducting a network audit, an administrator notices the spanning tree root in VLAN 300 does not match the configuration baseline, which could cause network outages due to spanning tree update failures. Which of the following should the administrator do to restore consistency?',
    options: [
      {
        letter: 'A',
        text: 'Change the designated port on the misconfigured switch to a root port.',
      },
      {
        letter: 'B',
        text: 'Change the root port to a listening port on the misconfigured switch.',
      },
      {
        letter: 'C',
        text: 'Change the blocked port of the misconfigured switch to a learning port.',
      },
      {
        letter: 'D',
        text: 'Increase the bridge ID/priority on the misconfigured switch.',
      },
    ],
    correct_answer: 'D',
  },
  {
    id: 327,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to connect a multimode fiber cable from the MDF to the server room. The administrator connects the cable to Switch 2, but there is no link light. The administrator tests the fiber and finds it does not have any issues. Swapping the connection to Switch 1 in a working port is successful, but the swapped connection does not work on Switch 2. Which of the following should the administrator verify next?',
    options: [
      { letter: 'A', text: 'Fiber length' },
      { letter: 'B', text: 'Transceiver model' },
      { letter: 'C', text: 'Connector type' },
      { letter: 'D', text: 'Port speed' },
    ],
    correct_answer: 'B',
  },
  {
    id: 328,
    type: 'multiple_choice',
    question_text:
      'Which of the following architecture types is most commonly associated with east-west traffic?',
    options: [
      { letter: 'A', text: 'Colocated VMs' },
      { letter: 'B', text: 'Hybrid cloud' },
      { letter: 'C', text: 'Client-server' },
      { letter: 'D', text: 'Hub and spoke' },
    ],
    correct_answer: 'A',
  },
  {
    id: 329,
    type: 'multiple_choice',
    question_text:
      'A company has been added to an unapproved list because of spam. The network administrator confirmed that a workstation was infected by malware. Which of the following processes did the administrator use to identify the root cause?',
    options: [
      { letter: 'A', text: 'Traffic analysis' },
      { letter: 'B', text: 'Availability monitoring' },
      { letter: 'C', text: 'Baseline metrics' },
      { letter: 'D', text: 'Network discovery' },
    ],
    correct_answer: 'A',
  },
  {
    id: 330,
    type: 'multiple_choice',
    question_text:
      'Which of the following actions happen during the first step of the troubleshooting methodology? (Choose two.)',
    options: [
      { letter: 'A', text: 'Question the obvious.' },
      { letter: 'B', text: 'Divide and conquer.' },
      { letter: 'C', text: 'Identify symptoms.' },
      { letter: 'D', text: 'Establish a theory.' },
      { letter: 'E', text: 'Use a top-to-bottom approach.' },
      { letter: 'F', text: 'Question users.' },
    ],
    correct_answer: ['C', 'F'],
  },
  {
    id: 331,
    type: 'multiple_choice',
    question_text:
      'Which of the following cable types allows the use of QSFP ports without requiring transceivers?',
    options: [
      { letter: 'A', text: 'Multimode' },
      { letter: 'B', text: 'Twinaxial' },
      { letter: 'C', text: 'RG11' },
      { letter: 'D', text: 'Category 6' },
    ],
    correct_answer: 'B',
  },
  {
    id: 332,
    type: 'multiple_choice',
    question_text:
      'A network administrator determines that some switch ports have more errors present than expected. The administrator traces the cabling associated with these ports. Which of the following would most likely be causing the errors?',
    options: [
      { letter: 'A', text: 'Shielded conduit' },
      { letter: 'B', text: 'Plenum spaces' },
      { letter: 'C', text: 'Voltage transformers' },
      { letter: 'D', text: 'Hydraulic lifts' },
    ],
    correct_answer: 'C',
  },
  {
    id: 333,
    type: 'multiple_choice',
    question_text:
      "A network administrator is troubleshooting an issue with a user's IP address. Which of the following layers of the OSI model should be considered?",
    options: [
      { letter: 'A', text: 'Data link' },
      { letter: 'B', text: 'Network' },
      { letter: 'C', text: 'Session' },
      { letter: 'D', text: 'Presentation' },
    ],
    correct_answer: 'B',
  },
  {
    id: 334,
    type: 'multiple_choice',
    question_text:
      'Which of the following will most likely allow a network administrator to work with current data after a disaster?',
    options: [
      { letter: 'A', text: 'Review backup tapes.' },
      { letter: 'B', text: 'Recover from cloud storage.' },
      { letter: 'C', text: 'Fail over to a hot site.' },
      { letter: 'D', text: 'Restore from a snapshot.' },
    ],
    correct_answer: 'C',
  },
  {
    id: 335,
    type: 'multiple_choice',
    question_text:
      'A network technician is attempting to map networking devices. When logged in to the local switch, the technician uses LLDP and discovers only those devices that are connected directly to the switch. Which of the following should the technician perform to discover all the networking devices?',
    options: [
      {
        letter: 'A',
        text: 'Reconfigure the management IP addresses of the networking devices on the same subnet.',
      },
      {
        letter: 'B',
        text: 'Enable Spanning Tree Protocol to allow the switches on the network to be discovered.',
      },
      {
        letter: 'C',
        text: 'Log in to each of the connected networking devices and perform the process again.',
      },
      {
        letter: 'D',
        text: 'Upgrade the OS on the networking devices to the current version of LLDP.',
      },
    ],
    correct_answer: 'C',
  },
  {
    id: 336,
    type: 'multiple_choice',
    question_text:
      'Which of the following can be used when a server at a remote site is physically unreachable?',
    options: [
      { letter: 'A', text: 'OOB management' },
      { letter: 'B', text: 'Crash cart' },
      { letter: 'C', text: 'Jump box' },
      { letter: 'D', text: 'Console' },
    ],
    correct_answer: 'A',
  },
  {
    id: 337,
    type: 'multiple_choice',
    question_text:
      'Which of the following source control features allows an administrator to test a new configuration without changing the primary configuration?',
    options: [
      { letter: 'A', text: 'Central repository' },
      { letter: 'B', text: 'Conflict identification' },
      { letter: 'C', text: 'Branching' },
      { letter: 'D', text: 'Version control' },
    ],
    correct_answer: 'C',
  },
  {
    id: 338,
    type: 'multiple_choice',
    question_text:
      'A network engineer needs to change, update, and control APs remotely, with real-time visibility over HTTPS. Which of the following will best allow these actions?',
    options: [
      { letter: 'A', text: 'Web interface' },
      { letter: 'B', text: 'Command line' },
      { letter: 'C', text: 'SNMP console' },
      { letter: 'D', text: 'API gateway' },
    ],
    correct_answer: 'D',
  },
  {
    id: 339,
    type: 'multiple_choice',
    question_text:
      'Which of the following is a location where a plenum cable is recommended?',
    options: [
      { letter: 'A', text: 'Frequently traveled areas' },
      { letter: 'B', text: 'Outdoor environments' },
      { letter: 'C', text: 'Inside conduits' },
      { letter: 'D', text: 'Airspaces above a ceiling' },
    ],
    correct_answer: 'D',
  },
  {
    id: 340,
    type: 'multiple_choice',
    question_text:
      "A customer calls the help desk to report issues connecting to the internet. The customer can reach a local database server. A technician goes to the site and examines the configuration:\nIP Address: 192.168.1.223\nSubnet Mask: 255.255.255.192\nDefault Gateway: 192.168.1.190\nDNS 1: 192.168.1.196\nDNS 2: 8.8.8.8\nWhich of the following is causing the user's issue?",
    options: [
      { letter: 'A', text: 'Incorrect DNS' },
      { letter: 'B', text: 'Unreachable gateway' },
      { letter: 'C', text: 'Failed root bridge' },
      { letter: 'D', text: 'Poor upstream routing' },
    ],
    correct_answer: 'B',
  },
  {
    id: 341,
    type: 'multiple_choice',
    question_text:
      'A company recently implemented a videoconferencing system that utilizes large amounts of bandwidth. Users start reporting slow internet speeds and an overall decrease in network performance. Which of the following are most likely the causes of the network performance issues? (Choose two.)',
    options: [
      { letter: 'A', text: 'DNS misconfiguration' },
      { letter: 'B', text: 'Inadequate network security' },
      { letter: 'C', text: 'Malware or a virus' },
      { letter: 'D', text: 'Outdated software' },
      { letter: 'E', text: 'Incorrect QoS settings' },
      { letter: 'F', text: 'Network congestion' },
    ],
    correct_answer: ['E', 'F'],
  },
  {
    id: 342,
    type: 'multiple_choice',
    question_text:
      'A technician needs to identify a computer on the network that is reportedly downloading unauthorized content. Which of the following should the technician use?',
    options: [
      { letter: 'A', text: 'Anomaly alerts' },
      { letter: 'B', text: 'Port mirroring' },
      { letter: 'C', text: 'Performance monitoring' },
      { letter: 'D', text: 'Packet capture' },
    ],
    correct_answer: 'D',
  },
  {
    id: 343,
    type: 'multiple_choice',
    question_text:
      'Which of the following troubleshooting steps would provide a change advisory board with the information needed to make a decision?',
    options: [
      { letter: 'A', text: 'Identify the problem.' },
      { letter: 'B', text: 'Develop a theory of probable cause.' },
      { letter: 'C', text: 'Test the theory to determine cause.' },
      { letter: 'D', text: 'Establish a plan of action.' },
    ],
    correct_answer: 'D',
  },
  {
    id: 344,
    type: 'multiple_choice',
    question_text:
      'Application software systems can no longer receive updates and security patches, and continuing to use the application software might expose the system to attacks. Which of the following best describes this scenario?',
    options: [
      { letter: 'A', text: 'SLA' },
      { letter: 'B', text: 'Licensing' },
      { letter: 'C', text: 'SIEM' },
      { letter: 'D', text: 'EOL' },
    ],
    correct_answer: 'D',
  },
  {
    id: 345,
    type: 'multiple_choice',
    question_text:
      'Which of the following technologies uses a VIP to provide gateway redundancy between two routers?',
    options: [
      { letter: 'A', text: 'LACP' },
      { letter: 'B', text: 'PAT' },
      { letter: 'C', text: 'FHRP' },
      { letter: 'D', text: 'BGP' },
    ],
    correct_answer: 'C',
  },
  {
    id: 346,
    type: 'multiple_choice',
    question_text:
      'Which of the following is the best way to reduce the likelihood of electrostatic discharge?',
    options: [
      { letter: 'A', text: 'Uninterruptable power supply' },
      { letter: 'B', text: 'Surge protector' },
      { letter: 'C', text: 'Power distribution units' },
      { letter: 'D', text: 'Temperature and humidity control' },
    ],
    correct_answer: 'D',
  },
  {
    id: 347,
    type: 'multiple_choice',
    question_text:
      'Several unauthorized APs near the corporate headquarters are broadcasting similar SSIDs. Which of the following types of attacks is being described?',
    options: [
      { letter: 'A', text: 'Evil twin' },
      { letter: 'B', text: 'Wi-Fi jamming' },
      { letter: 'C', text: 'On-path' },
      { letter: 'D', text: 'Wardriving' },
    ],
    correct_answer: 'A',
  },
  {
    id: 349,
    type: 'multiple_choice',
    question_text:
      'A security engineer is trying to connect cameras to a 12-port PoE switch, but only eight cameras turn on. Which of the following should the engineer check first?',
    options: [
      { letter: 'A', text: 'Ethernet cable type' },
      { letter: 'B', text: 'Voltage' },
      { letter: 'C', text: 'Transceiver compatibility' },
      { letter: 'D', text: 'DHCP addressing' },
    ],
    correct_answer: 'B',
  },
  {
    id: 350,
    type: 'multiple_choice',
    question_text:
      "A network administrator is setting up a firewall to protect the organization's network from external threats. Which of the following should the administrator consider first when configuring the firewall?",
    options: [
      { letter: 'A', text: 'Required ports, protocols, and services' },
      { letter: 'B', text: 'Inclusion of a deny all rule' },
      { letter: 'C', text: 'VPN access' },
      {
        letter: 'D',
        text: 'Outbound access originating from customer-facing servers',
      },
    ],
    correct_answer: 'A',
  },
  // ... 101-150
  {
    id: 101,
    type: 'multiple_choice',
    question_text:
      'Which of the following most likely requires the use of subinterfaces?',
    options: [
      { letter: 'A', text: 'A router with only one available LAN port' },
      { letter: 'B', text: 'A firewall performing deep packet inspection' },
      { letter: 'C', text: 'A hub utilizing jumbo frames' },
      { letter: 'D', text: 'A switch using Spanning Tree Protocol' },
    ],
    correct_answer: 'A',
  },
  {
    id: 102,
    type: 'multiple_choice',
    question_text:
      'A company receives a cease-and-desist order from its ISP regarding prohibited torrent activity. Which of the following should be implemented to comply with the cease-and-desist order?',
    options: [
      { letter: 'A', text: 'MAC security' },
      { letter: 'B', text: 'Content filtering' },
      { letter: 'C', text: 'Screened subnet' },
      { letter: 'D', text: 'Perimeter network' },
    ],
    correct_answer: 'B',
  },
  {
    id: 103,
    type: 'multiple_choice',
    question_text:
      'Which of the following requires network devices to be managed using a different set of IP addresses?',
    options: [
      { letter: 'A', text: 'Console' },
      { letter: 'B', text: 'Split tunnel' },
      { letter: 'C', text: 'Jump box' },
      { letter: 'D', text: 'Out of band' },
    ],
    correct_answer: 'D',
  },
  {
    id: 104,
    type: 'multiple_choice',
    question_text:
      'A network administrator wants to configure a backup route in case the primary route fails. A dynamic routing protocol is not installed on the router. Which of the following routing features should the administrator choose to accomplish this task?',
    options: [
      { letter: 'A', text: 'Neighbor adjacency' },
      { letter: 'B', text: 'Link state flooding' },
      { letter: 'C', text: 'Administrative distance' },
      { letter: 'D', text: 'Hop count' },
    ],
    correct_answer: 'C',
  },
  {
    id: 105,
    type: 'multiple_choice',
    question_text:
      'Which of the following steps of the troubleshooting methodology should a technician take to confirm a theory?',
    options: [
      { letter: 'A', text: 'Duplicate the problem.' },
      { letter: 'B', text: 'Identify the symptoms.' },
      { letter: 'C', text: 'Gather information.' },
      { letter: 'D', text: 'Determine any changes.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 106,
    type: 'multiple_choice',
    question_text:
      'A network administrator is deploying a new switch and wants to make sure that the default priority value was set for a spanning tree. Which of the following values would the network administrator expect to see?',
    options: [
      { letter: 'A', text: '4096' },
      { letter: 'B', text: '8192' },
      { letter: 'C', text: '32768' },
      { letter: 'D', text: '36684' },
    ],
    correct_answer: 'C',
  },
  {
    id: 107,
    type: 'multiple_choice',
    question_text:
      'A network administrator is configuring a wireless network with an ESSID. Which of the following is a user benefit of ESSID compared to SSID?',
    options: [
      { letter: 'A', text: 'Stronger wireless connection' },
      { letter: 'B', text: 'Roaming between access points' },
      { letter: 'C', text: 'Advanced security' },
      { letter: 'D', text: 'Increased throughput' },
    ],
    correct_answer: 'B',
  },
  {
    id: 108,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to connect two routers in a point-to-point configuration and conserve IP space. Which of the following subnets should the administrator use?',
    options: [
      { letter: 'A', text: '/24' },
      { letter: 'B', text: '/26' },
      { letter: 'C', text: '/28' },
      { letter: 'D', text: '/30' },
    ],
    correct_answer: 'D',
  },
  {
    id: 109,
    type: 'multiple_choice',
    question_text:
      'An attacker follows an employee through a badge-secured door before the door closes. Which of the following types of attacks is occurring?',
    options: [
      { letter: 'A', text: 'Shoulder surfing' },
      { letter: 'B', text: 'Tailgating' },
      { letter: 'C', text: 'Phishing' },
      { letter: 'D', text: 'On-path' },
    ],
    correct_answer: 'B',
  },
  {
    id: 110,
    type: 'multiple_choice',
    question_text:
      "A research facility is expecting to see an exponential increase in global network traffic in the near future. The offices are equipped with 2.5Gbps fiber connections from the ISP, but the facility is currently only utilizing 1Gbps connections. Which of the following would need to be configured in order to use the ISP's connection speed?",
    options: [
      { letter: 'A', text: '802.1Q tagging' },
      { letter: 'B', text: 'Network address translation' },
      { letter: 'C', text: 'Port duplex' },
      { letter: 'D', text: 'Link aggregation' },
    ],
    correct_answer: 'D',
  },
  {
    id: 111,
    type: 'multiple_choice',
    question_text:
      'A VoIP phone is plugged in to a port but cannot receive calls. Which of the following needs to be done on the port to address the issue?',
    options: [
      { letter: 'A', text: 'Trunk all VLANs on the port.' },
      { letter: 'B', text: 'Configure the native VLAN.' },
      { letter: 'C', text: 'Tag the traffic to voice VLAN.' },
      { letter: 'D', text: 'Disable VLANS.' },
    ],
    correct_answer: 'C',
  },
  {
    id: 112,
    type: 'multiple_choice',
    question_text: 'Which of the following can support a jumbo frame?',
    options: [
      { letter: 'A', text: 'Access point' },
      { letter: 'B', text: 'Bridge' },
      { letter: 'C', text: 'Hub' },
      { letter: 'D', text: 'Switch' },
    ],
    correct_answer: 'D',
  },
  {
    id: 113,
    type: 'multiple_choice',
    question_text:
      'A network manager wants to implement a SIEM system to correlate system events. Which of the following protocols should the network manager verify?',
    options: [
      { letter: 'A', text: 'NTP' },
      { letter: 'B', text: 'DNS' },
      { letter: 'C', text: 'LDAP' },
      { letter: 'D', text: 'DHCP' },
    ],
    correct_answer: 'A',
  },
  {
    id: 114,
    type: 'multiple_choice',
    question_text:
      'A network engineer is designing a secure communication link between two sites. The entire data stream needs to remain confidential. Which of the following will achieve this goal?',
    options: [
      { letter: 'A', text: 'GRE' },
      { letter: 'B', text: 'IKE' },
      { letter: 'C', text: 'ESP' },
      { letter: 'D', text: 'AH' },
    ],
    correct_answer: 'C',
  },
  {
    id: 115,
    type: 'multiple_choice',
    question_text:
      'Which of the following protocols has a default administrative distance value of 90?',
    options: [
      { letter: 'A', text: 'RIP' },
      { letter: 'B', text: 'EIGRP' },
      { letter: 'C', text: 'OSPF' },
      { letter: 'D', text: 'BGP' },
    ],
    correct_answer: 'B',
  },
  {
    id: 116,
    type: 'multiple_choice',
    question_text:
      'An office is experiencing intermittent connection issues. A network engineer identifies that the issue occurs whenever someone uses the fax machine that is connected to a switch. Which of the following should the engineer do first to resolve the issue?',
    options: [
      { letter: 'A', text: 'Run a new Cat 5 line.' },
      { letter: 'B', text: 'Enable 802.1Q tagging.' },
      { letter: 'C', text: 'Change the MTU.' },
      { letter: 'D', text: 'Configure a VLAN.' },
    ],
    correct_answer: 'D',
  },
  {
    id: 117,
    type: 'multiple_choice',
    question_text:
      'A network engineer receives a vendor alert regarding a vulnerability in a router CPU. Which of the following should the engineer do to resolve the issue?',
    options: [
      { letter: 'A', text: 'Update the firmware.' },
      { letter: 'B', text: 'Replace the system board.' },
      { letter: 'C', text: 'Patch the OS.' },
      { letter: 'D', text: 'Isolate the system.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 118,
    type: 'multiple_choice',
    question_text:
      'Which of the following fiber connector types is the most likely to be used on a network interface card?',
    options: [
      { letter: 'A', text: 'LC' },
      { letter: 'B', text: 'SC' },
      { letter: 'C', text: 'ST' },
      { letter: 'D', text: 'MPO' },
    ],
    correct_answer: 'A',
  },
  {
    id: 119,
    type: 'multiple_choice',
    question_text:
      'Which of the following connectors provides console access to a switch?',
    options: [
      { letter: 'A', text: 'ST' },
      { letter: 'B', text: 'RJ45' },
      { letter: 'C', text: 'BNC' },
      { letter: 'D', text: 'SFP' },
    ],
    correct_answer: 'B',
  },
  {
    id: 120,
    type: 'multiple_choice',
    question_text:
      'A network administrator notices interference with industrial equipment in the 2.4GHz range. Which of the following technologies would most likely mitigate this issue? (Choose two.)',
    options: [
      { letter: 'A', text: 'Mesh network' },
      { letter: 'B', text: '5GHz frequency' },
      { letter: 'C', text: 'Omnidirectional antenna' },
      { letter: 'D', text: 'Non-overlapping channel' },
      { letter: 'E', text: 'Captive portal' },
      { letter: 'F', text: 'Ad hoc network' },
    ],
    correct_answer: ['B', 'D'],
  },
  {
    id: 121,
    type: 'multiple_choice',
    question_text:
      'Which of the following network topologies contains a direct connection between every node in the network?',
    options: [
      { letter: 'A', text: 'Mesh' },
      { letter: 'B', text: 'Star' },
      { letter: 'C', text: 'Hub-and-spoke' },
      { letter: 'D', text: 'Point-to-point' },
    ],
    correct_answer: 'A',
  },
  {
    id: 122,
    type: 'multiple_choice',
    question_text:
      'A network architect needs to create a wireless field network to provide reliable service to public safety vehicles. Which of the following types of networks is the best solution?',
    options: [
      { letter: 'A', text: 'Mesh' },
      { letter: 'B', text: 'Ad hoc' },
      { letter: 'C', text: 'Point-to-point' },
      { letter: 'D', text: 'Infrastructure' },
    ],
    correct_answer: 'A',
  },
  {
    id: 123,
    type: 'multiple_choice',
    question_text:
      'A manager is evaluating the environmental design of a data center. Which of the following setups should the manager implement if the maximum thermal dissipation is the highest concern?',
    options: [
      { letter: 'A', text: 'A blue-green' },
      { letter: 'B', text: 'A hot-cold' },
      { letter: 'C', text: 'An east-west' },
      { letter: 'D', text: 'An active-passive' },
    ],
    correct_answer: 'B',
  },
  {
    id: 124,
    type: 'multiple_choice',
    question_text:
      'A network administrator configured a router interface as 10.0.0.95 255.255.255.240. The administrator discovers that the router is not routing packets to a web server with IP 10.0.0.81/28. Which of the following is the best explanation?',
    options: [
      { letter: 'A', text: 'The web server is in a different subnet.' },
      { letter: 'B', text: 'The router interface is a broadcast address.' },
      { letter: 'C', text: 'The IP address space is a class A network.' },
      { letter: 'D', text: 'The subnet is in a private address space.' },
    ],
    correct_answer: 'B',
  },
  {
    id: 125,
    type: 'multiple_choice',
    question_text:
      "A network administrator is notified that a user cannot access resources on the network. The network administrator check the physical connections to the workstation labeled User 3 and sees the Ethernet is properly connected. However, the network interface's indicator lights are not blinking on either the computer or the switch. Which of the following is the most likely cause?",
    options: [
      { letter: 'A', text: 'The switch failed.' },
      { letter: 'B', text: 'The default gateway is wrong.' },
      { letter: 'C', text: 'The port is shut down.' },
      { letter: 'D', text: 'The VLAN assignment is incorrect.' },
    ],
    correct_answer: 'C',
  },
  {
    id: 126,
    type: 'multiple_choice',
    question_text:
      'Which of the following internal routing protocols is best characterized as having fast convergence and being loop-free?',
    options: [
      { letter: 'A', text: 'BGP' },
      { letter: 'B', text: 'STP' },
      { letter: 'C', text: 'OSPF' },
      { letter: 'D', text: 'RIP' },
    ],
    correct_answer: 'C',
  },
  {
    id: 127,
    type: 'multiple_choice',
    question_text:
      'An administrator is setting up an SNMP server for use in the enterprise network and needs to create device IDs within a MIB. Which of the following describes the function of a MIB?',
    options: [
      { letter: 'A', text: 'DHCP relay device' },
      { letter: 'B', text: 'Policy enforcement point' },
      { letter: 'C', text: 'Definition file for event translation' },
      { letter: 'D', text: 'Network access controller' },
    ],
    correct_answer: 'C',
  },
  {
    id: 128,
    type: 'multiple_choice',
    question_text:
      'A critical infrastructure switch is identified as end-of-support. Which of the following is the best next step to ensure security?',
    options: [
      { letter: 'A', text: 'Apply the latest patches and bug fixes.' },
      { letter: 'B', text: 'Decommission and replace the switch.' },
      { letter: 'C', text: 'Ensure the current firmware has no issues.' },
      { letter: 'D', text: 'Isolate the switch from the network.' },
    ],
    correct_answer: 'B',
  },
  {
    id: 129,
    type: 'multiple_choice',
    question_text:
      "A company's marketing team created a new application and would like to create a DNS record for newapplication.comptia.org that always resolves to the same address as wwww.comptia.org. Which of the following records should the administrator use?",
    options: [
      { letter: 'A', text: 'SOA' },
      { letter: 'B', text: 'MX' },
      { letter: 'C', text: 'CNAME' },
      { letter: 'D', text: 'NS' },
    ],
    correct_answer: 'C',
  },
  {
    id: 130,
    type: 'multiple_choice',
    question_text:
      'A network administrator wants to implement security zones in the corporate network to control access to only individuals inside of the corporation. Which of the following security zones is the best solution?',
    options: [
      { letter: 'A', text: 'Extranet' },
      { letter: 'B', text: 'Trusted' },
      { letter: 'C', text: 'VPN' },
      { letter: 'D', text: 'Public' },
    ],
    correct_answer: 'B',
  },
  {
    id: 131,
    type: 'multiple_choice',
    question_text:
      'Which of the following network devices converts wireless signals to electronic signals?',
    options: [
      { letter: 'A', text: 'Router' },
      { letter: 'B', text: 'Firewall' },
      { letter: 'C', text: 'Access point' },
      { letter: 'D', text: 'Load balancer' },
    ],
    correct_answer: 'C',
  },
  {
    id: 132,
    type: 'multiple_choice',
    question_text:
      'A network administrator deployed wireless networking in the office area. When users visit the outdoor patio and try to download emails with large attachments or stream training videos, they notice buffering issues. Which of the following is the most likely cause?',
    options: [
      { letter: 'A', text: 'Network congestion' },
      { letter: 'B', text: 'Wireless interference' },
      { letter: 'C', text: 'Signal degradation' },
      { letter: 'D', text: 'Client disassociation' },
    ],
    correct_answer: 'C',
  },
  {
    id: 133,
    type: 'multiple_choice',
    question_text:
      'Which of the following activities would have groups from different departments evaluate the disaster recovery process?',
    options: [
      { letter: 'A', text: 'Validation test' },
      { letter: 'B', text: 'SLA alignment' },
      { letter: 'C', text: 'Tabletop exercises' },
      { letter: 'D', text: 'Active-active approach' },
    ],
    correct_answer: 'C',
  },
  {
    id: 134,
    type: 'multiple_choice',
    question_text:
      'Which of the following routing protocols uses an autonomous system number?',
    options: [
      { letter: 'A', text: 'IS-IS' },
      { letter: 'B', text: 'OSPF' },
      { letter: 'C', text: 'BGP' },
      { letter: 'D', text: 'EIGRP' },
    ],
    correct_answer: 'C',
  },
  {
    id: 135,
    type: 'multiple_choice',
    question_text:
      'Which of the following is a characteristic of the application layer?',
    options: [
      { letter: 'A', text: 'It relies upon other layers for packet delivery.' },
      { letter: 'B', text: 'It checks independently for packet loss.' },
      { letter: 'C', text: 'It encrypts data in transit.' },
      { letter: 'D', text: 'It performs address translation.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 136,
    type: 'multiple_choice',
    question_text:
      'Which of the following IP transmission types encrypts all of the transmitted data?',
    options: [
      { letter: 'A', text: 'ESP' },
      { letter: 'B', text: 'AH' },
      { letter: 'C', text: 'GRE' },
      { letter: 'D', text: 'UDP' },
      { letter: 'E', text: 'TCP' },
    ],
    correct_answer: 'A',
  },
  {
    id: 137,
    type: 'multiple_choice',
    question_text:
      'Which of the following should be configured so users can authenticate to a wireless network using company credentials?',
    options: [
      { letter: 'A', text: 'SSO' },
      { letter: 'B', text: 'SAML' },
      { letter: 'C', text: 'MFA' },
      { letter: 'D', text: 'RADIUS' },
    ],
    correct_answer: 'D',
  },
  {
    id: 138,
    type: 'multiple_choice',
    question_text:
      'A network engineer performed a migration to a new mail server. The engineer changed the MX record, verified the change was accurate, and confirmed the new mail server was reachable via the IP address in the A record. However, users are not receiving email. Which of the following should the engineer have done to prevent the issue from occurring?',
    options: [
      {
        letter: 'A',
        text: 'Change the email client configuration to match the MX record.',
      },
      {
        letter: 'B',
        text: 'Reduce the TTL record prior to the MX record change.',
      },
      {
        letter: 'C',
        text: 'Perform a DNS zone transfer prior to the MX record change.',
      },
      {
        letter: 'D',
        text: 'Update the NS record to reflect the IP address change.',
      },
    ],
    correct_answer: 'B',
  },
  {
    id: 139,
    type: 'multiple_choice',
    question_text:
      "Which of the following should a network administrator configure when adding OT devices to an organization's architecture?",
    options: [
      { letter: 'A', text: 'Honeynet' },
      { letter: 'B', text: 'Data-at-rest encryption' },
      { letter: 'C', text: 'Time-based authentication' },
      { letter: 'D', text: 'Network segmentation' },
    ],
    correct_answer: 'D',
  },
  {
    id: 140,
    type: 'multiple_choice',
    question_text:
      'To reduce costs and increase mobility, a Chief Technology Officer (CTO) wants to adopt cloud services for the organization and its affiliates. To reduce the impact for users, the CTO wants key services to run from the on-site data center and enterprise services to run in the cloud. Which of the following deployment models is the best choice for the organization?',
    options: [
      { letter: 'A', text: 'Public' },
      { letter: 'B', text: 'Hybrid' },
      { letter: 'C', text: 'SaaS' },
      { letter: 'D', text: 'Private' },
    ],
    correct_answer: 'B',
  },
  {
    id: 141,
    type: 'multiple_choice',
    question_text:
      'Which of the following is used to describe the average duration of an outage for a specific service?',
    options: [
      { letter: 'A', text: 'RPO' },
      { letter: 'B', text: 'MTTR' },
      { letter: 'C', text: 'RTO' },
      { letter: 'D', text: 'MTBF' },
    ],
    correct_answer: 'B',
  },
  {
    id: 142,
    type: 'multiple_choice',
    question_text:
      'A network engineer is setting up a new VoIP network for a customer. The current network is segmented only for computers and servers. No additional switch ports can be used in the new network. Which of the following does the engineer need to do to configure the network correctly? (Choose two.)',
    options: [
      { letter: 'A', text: 'Change network translation definitions.' },
      { letter: 'B', text: 'Enable 802.1Q.' },
      { letter: 'C', text: 'Implement a routing protocol.' },
      { letter: 'D', text: 'Set up voice VLANS.' },
      { letter: 'E', text: 'Reconfigure the DNS.' },
      { letter: 'F', text: 'Place devices in the perimeter network.' },
    ],
    correct_answer: ['B', 'D'],
  },
  {
    id: 143,
    type: 'multiple_choice',
    question_text:
      'A network rack has four servers and four switches with dual power supplies. Only one intelligent PDU is installed in the rack. Which of the following is the reason to add a second PDU?',
    options: [
      { letter: 'A', text: 'Power redundancy' },
      { letter: 'B', text: 'Failed PSU monitoring' },
      { letter: 'C', text: 'Surge protection' },
      { letter: 'D', text: 'Electricity conservation' },
    ],
    correct_answer: 'A',
  },
  {
    id: 144,
    type: 'multiple_choice',
    question_text:
      'Which of the following allows a user to connect to an isolated device on a stand-alone network?',
    options: [
      { letter: 'A', text: 'Jump box' },
      { letter: 'B', text: 'API gateway' },
      { letter: 'C', text: 'Secure Shell' },
      { letter: 'D', text: 'Clientless VPN' },
    ],
    correct_answer: 'A',
  },
  {
    id: 145,
    type: 'multiple_choice',
    question_text:
      'Early in the morning, an administrator installs a new DHCP server. In the afternoon, some users report they are experiencing network outages. Which of the following is the most likely issue?',
    options: [
      {
        letter: 'A',
        text: 'The administrator did not provision enough IP addresses.',
      },
      {
        letter: 'B',
        text: 'The administrator configured an incorrect default gateway.',
      },
      {
        letter: 'C',
        text: 'The administrator did not provision enough routes.',
      },
      {
        letter: 'D',
        text: 'The administrator did not provision enough MAC addresses.',
      },
    ],
    correct_answer: 'A',
  },
  {
    id: 146,
    type: 'multiple_choice',
    question_text:
      'A company is implementing a policy that will not allow employees to bring personal devices to the office and connect to the wireless network. Which of the following is the best way to enforce this policy?',
    options: [
      { letter: 'A', text: 'MAC filtering' },
      { letter: 'B', text: '802.1X' },
      { letter: 'C', text: 'Port security' },
      { letter: 'D', text: 'ACL' },
    ],
    correct_answer: 'B',
  },
  {
    id: 147,
    type: 'multiple_choice',
    question_text:
      'A network engineer is troubleshooting an issue with a VoIP network. After performing analysis, the engineer found that when users upload large files, voice quality is severely degraded. When no other traffic is on the network, voice quality is fine. Which of the following should the engineer do to most likely resolve the issue?',
    options: [
      { letter: 'A', text: 'Enable MAC filtering.' },
      { letter: 'B', text: 'Reduce the VLAN database.' },
      { letter: 'C', text: 'Configure QoS on the router.' },
      { letter: 'D', text: 'Implement ACLs.' },
    ],
    correct_answer: 'C',
  },
  {
    id: 148,
    type: 'multiple_choice',
    question_text:
      'Which of the following disaster recovery metrics is used to describe the amount of data that is lost since the last backup?',
    options: [
      { letter: 'A', text: 'MTTR' },
      { letter: 'B', text: 'RTO' },
      { letter: 'C', text: 'RPO' },
      { letter: 'D', text: 'MTBF' },
    ],
    correct_answer: 'C',
  },
  {
    id: 149,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to improve network monitoring. Which of the following should the administrator do first?',
    options: [
      { letter: 'A', text: 'Establish baseline metrics.' },
      { letter: 'B', text: 'Implement a SIEM.' },
      { letter: 'C', text: 'Perform regular packet captures.' },
      { letter: 'D', text: 'Conduct availability monitoring.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 150,
    type: 'multiple_choice',
    question_text:
      'A network administrator is troubleshooting issues with a DHCP server at a university. More students have recently arrived on campus, and the users are unable to obtain an IP address. Which of the following should the administrator do to address the issue?',
    options: [
      { letter: 'A', text: 'Enable IP helper.' },
      { letter: 'B', text: 'Change the subnet mask.' },
      { letter: 'C', text: 'Increase the scope size.' },
      { letter: 'D', text: 'Add address exclusions.' },
    ],
    correct_answer: 'C',
  },
  // ... 351-400
  {
    id: 351,
    type: 'multiple_choice',
    question_text:
      'A network administrator is unable to ping a remote server from a newly connected workstation that has been added to the network. Ping to 127.0.0.1 on the workstation is failing. Which of the following should the administrator perform to diagnose the problem?',
    options: [
      { letter: 'A', text: 'Verify the NIC interface status.' },
      { letter: 'B', text: 'Verify the network is not congested.' },
      { letter: 'C', text: 'Verify the router is not dropping packets.' },
      { letter: 'D', text: 'Verify that DNS is resolving correctly.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 352,
    type: 'multiple_choice',
    question_text:
      'A company is installing network cables above the ceiling tiles. The cables must be fire rated. Which of the following cable types should the company use?',
    options: [
      { letter: 'A', text: 'Coaxial' },
      { letter: 'B', text: 'Plenum' },
      { letter: 'C', text: 'Crossover' },
      { letter: 'D', text: 'STP' },
    ],
    correct_answer: 'B',
  },
  {
    id: 353,
    type: 'multiple_choice',
    question_text:
      'A VoIP phone powers up, but it is unable to receive or place calls. After connecting to another switchport, the issue is resolved. Which of the following was most likely the issue with the previous port?',
    options: [
      { letter: 'A', text: 'The port had a half-duplex configuration.' },
      { letter: 'B', text: 'The port was in an error-disabled state.' },
      { letter: 'C', text: 'The port had an incorrect VLAN assignment.' },
      { letter: 'D', text: 'The port exceeded its PoE budget.' },
    ],
    correct_answer: 'C',
  },
  {
    id: 354,
    type: 'multiple_choice',
    question_text:
      'A network administrator recently configured an autonomous wireless AP and performed a throughput test via comptiaspeedtester.com. The result was 75Mbps. When connected to other APs, the results reached 500Mbps. Which of the following is most likely the reason for this difference?',
    options: [
      { letter: 'A', text: 'Channel width configuration' },
      { letter: 'B', text: 'DNS server issues' },
      { letter: 'C', text: 'Authentication failure' },
      { letter: 'D', text: 'Incorrect DHCP settings' },
    ],
    correct_answer: 'A',
  },
  {
    id: 355,
    type: 'multiple_choice',
    question_text:
      'Which of the following technologies is most appropriate for a business that requires high-speed access to frequently used web content, such as images and videos?',
    options: [
      { letter: 'A', text: 'CDN' },
      { letter: 'B', text: 'SAN' },
      { letter: 'C', text: 'Firewall' },
      { letter: 'D', text: 'Switch' },
    ],
    correct_answer: 'A',
  },
  {
    id: 356,
    type: 'multiple_choice',
    question_text: 'Which of the following should be included in an SLA?',
    options: [
      { letter: 'A', text: 'Patches and bug fixes' },
      { letter: 'B', text: 'Licensing' },
      { letter: 'C', text: 'Inventory management' },
      { letter: 'D', text: 'Stakeholders' },
    ],
    correct_answer: 'A',
  },
  {
    id: 357,
    type: 'multiple_choice',
    question_text:
      'A network administrator thinks a change was made to mail servers at comptia.org. Which of the following should the administrator execute to verify the change?',
    options: [
      { letter: 'A', text: 'ping www.comptia.org' },
      { letter: 'B', text: 'dig comptia.org ANY' },
      { letter: 'C', text: 'nslookup -type=ns coir.ptia.org' },
      { letter: 'D', text: 'tracert comptia.org' },
    ],
    correct_answer: 'B',
  },
  {
    id: 358,
    type: 'multiple_choice',
    question_text:
      'A network technician receives a new ticket while working on another issue. The new ticket is critical to business operations. Which of the following documents should the technician reference to determine which ticket to complete first?',
    options: [
      { letter: 'A', text: 'NDA' },
      { letter: 'B', text: 'AUP' },
      { letter: 'C', text: 'SLA' },
      { letter: 'D', text: 'MOU' },
    ],
    correct_answer: 'C',
  },
  {
    id: 359,
    type: 'multiple_choice',
    question_text:
      'A network engineer is troubleshooting connectivity for a newly installed server on an existing VLAN. The engineer reviews the following requested output:\nipconfig\nIF Address: 192.168.100.225\nMask: 255.255.255.224\nGateway: 192.168.100.254\nThe engineer then logs in to the router and runs the following:\nRouter# show ip route\nC 192.168.100.0/24 is directly connected, GigabitEthernet0/0\nWhich of the following describes the issue?',
    options: [
      { letter: 'A', text: 'The server has an incorrect subnet mask.' },
      { letter: 'B', text: 'There is a duplicate IP address on the network.' },
      { letter: 'C', text: 'The DHCP address pool is exhausted.' },
      { letter: 'D', text: 'The router is missing a default route.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 360,
    type: 'multiple_choice',
    question_text:
      'A network administrator installs new cabling to connect new computers and access points. After deploying the equipment, the administrator notices a few of the devices are not connecting properly. The administrator moves the devices to a different port, but it does not resolve the issue. Which of the following should the administrator verify next?',
    options: [
      { letter: 'A', text: 'Power budget' },
      { letter: 'B', text: 'Device requirements' },
      { letter: 'C', text: 'Port status' },
      { letter: 'D', text: 'Cable termination' },
    ],
    correct_answer: 'D',
  },
  {
    id: 361,
    type: 'multiple_choice',
    question_text:
      'Which of the following could provide a lightweight and private connection to a remote box?',
    options: [
      { letter: 'A', text: 'Site-to-site VPN' },
      { letter: 'B', text: 'Telnet' },
      { letter: 'C', text: 'Console' },
      { letter: 'D', text: 'Secure Shell' },
    ],
    correct_answer: 'D',
  },
  {
    id: 362,
    type: 'multiple_choice',
    question_text:
      'Which of the following routing protocols is most commonly used to interconnect WANs?',
    options: [
      { letter: 'A', text: 'IGP' },
      { letter: 'B', text: 'EIGRP' },
      { letter: 'C', text: 'BGP' },
      { letter: 'D', text: 'OSPF' },
    ],
    correct_answer: 'C',
  },
  {
    id: 363,
    type: 'multiple_choice',
    question_text:
      'A server administrator deploys a new web server with an IP address of 192.168.16.100. The security policy dictates that all non-secure connection methods should be blocked. Which of the following security rules will satisfy the request without prohibiting other traffic?',
    options: [
      { letter: 'A', text: 'Deny any 192.168.16.0 255.255.255.0 80' },
      { letter: 'B', text: 'Deny 192.168.16.100 255.255.255.255 any' },
      { letter: 'C', text: 'Deny any 192.168.16.100 255.255.255.255 80' },
      { letter: 'D', text: 'Permit any 192.168.16.100 255.255.255.255 80' },
      { letter: 'E', text: 'Permit 192.168.16.100 255.255.255.255 any' },
    ],
    correct_answer: 'C',
  },
  {
    id: 364,
    type: 'multiple_choice',
    question_text:
      'Which of the following protocol ports should be used to securely transfer a file?',
    options: [
      { letter: 'A', text: '22' },
      { letter: 'B', text: '69' },
      { letter: 'C', text: '80' },
      { letter: 'D', text: '3389' },
    ],
    correct_answer: 'A',
  },
  {
    id: 365,
    type: 'multiple_choice',
    question_text:
      'A company reports that their facsimile machine no longer has a dial tone when trying to send a fax. The phone cable is damaged on one end. Which of the following types of connectors should a technician replace?',
    options: [
      { letter: 'A', text: 'F-type' },
      { letter: 'B', text: 'RJ45' },
      { letter: 'C', text: 'SC' },
      { letter: 'D', text: 'RJ11' },
    ],
    correct_answer: 'D',
  },
  {
    id: 366,
    type: 'multiple_choice',
    question_text:
      'A network technician is installing a new switch that does not support STP at the access layer of a network. The technician wants a redundant connection to the distribution switch. Which of the following should the technician use?',
    options: [
      { letter: 'A', text: 'Link aggregation' },
      { letter: 'B', text: 'Subinterfaces' },
      { letter: 'C', text: 'Switch virtual interfaces' },
      { letter: 'D', text: 'Half-duplex connections' },
    ],
    correct_answer: 'A',
  },
  {
    id: 367,
    type: 'multiple_choice',
    question_text:
      "A company recently rearranged some users' workspaces and moved several users to previously used workspaces. The network administrator receives a report that all of the users who were moved are having connectivity issues. Which of the following is the most likely reason?",
    options: [
      { letter: 'A', text: 'Ports are error disabled.' },
      { letter: 'B', text: 'Ports have an incorrect native VLAN.' },
      { letter: 'C', text: 'Ports are having an MDIX issue.' },
      { letter: 'D', text: 'Ports are trunk ports.' },
    ],
    correct_answer: 'D',
  },
  {
    id: 368,
    type: 'multiple_choice',
    question_text:
      'A newly opened retail shop uses a combination of new tablets, PCs, printers, and legacy card readers. Which of the following wireless encryption types is the most secure and compatible?',
    options: [
      { letter: 'A', text: 'WPA3' },
      { letter: 'B', text: 'WPA2' },
      { letter: 'C', text: 'WPA2/WPA3 mixed mode' },
      { letter: 'D', text: 'WPA/WPA2 mixed mode' },
    ],
    correct_answer: 'C',
  },
  {
    id: 369,
    type: 'multiple_choice',
    question_text:
      "A network administrator changed an external DNS to point customers to a new server. Which of the following tools should the administrator use to test the new server's configuration?",
    options: [
      { letter: 'A', text: 'ping' },
      { letter: 'B', text: 'tracert' },
      { letter: 'C', text: 'tcpdump' },
      { letter: 'D', text: 'nslookup' },
    ],
    correct_answer: 'D',
  },
  {
    id: 370,
    type: 'multiple_choice',
    question_text:
      'A company is expanding to another floor in the same building. The network engineer configures a new switch with the same VLANs as the existing stack. When the network engineer connects the new switch to the existing stack, all users lose connectivity. Which of the following is the most likely reason?',
    options: [
      { letter: 'A', text: 'The new switch has unused ports disabled.' },
      { letter: 'B', text: 'The new switch does not have a default gateway.' },
      { letter: 'C', text: 'The new switch is connected to an access port.' },
      { letter: 'D', text: 'The new switch is in a spanning tree loop.' },
    ],
    correct_answer: 'D',
  },
  {
    id: 371,
    type: 'multiple_choice',
    question_text:
      'Which of the following is the most likely benefit of installing server equipment in a rack?',
    options: [
      { letter: 'A', text: 'Simplified troubleshooting process' },
      { letter: 'B', text: 'Decreased power consumption' },
      { letter: 'C', text: 'Improved network performance' },
      { letter: 'D', text: 'Increased compute density' },
    ],
    correct_answer: 'D',
  },
  {
    id: 372,
    type: 'multiple_choice',
    question_text:
      'A technician is implementing a new SD-WAN device with a default configuration. The technician receives a URL via email and connects the new device to the internet to complete the installation. Which of the following is this an example of?',
    options: [
      { letter: 'A', text: 'Voice VLAN' },
      { letter: 'B', text: 'Native VLAN' },
      { letter: 'C', text: 'Data VLAN' },
      { letter: 'D', text: 'Trunk port' },
    ],
    correct_answer: 'C',
  },
  {
    id: 373,
    type: 'multiple_choice',
    question_text:
      'A help desk technician receives a report that users cannot access internet URLs. The technician does some ping tests and finds that sites fail when a URL is used but work when an IP is used. Which of the following tools should the technician utilize next?',
    options: [
      { letter: 'A', text: 'tcpdump' },
      { letter: 'B', text: 'tracert' },
      { letter: 'C', text: 'nmap' },
      { letter: 'D', text: 'dig' },
    ],
    correct_answer: 'D',
  },
  {
    id: 374,
    type: 'multiple_choice',
    question_text:
      'Which of the following is the part of a DR plan that identifies the critical systems that should be recovered first after an incident?',
    options: [
      { letter: 'A', text: 'RTO' },
      { letter: 'B', text: 'SLA' },
      { letter: 'C', text: 'MTBF' },
      { letter: 'D', text: 'SIEM' },
    ],
    correct_answer: 'A',
  },
  {
    id: 375,
    type: 'multiple_choice',
    question_text:
      'Which of the following is the best VPN to use for reducing data bandwidth requirements of the corporate network?',
    options: [
      { letter: 'A', text: 'Split-tunnel' },
      { letter: 'B', text: 'Site-to-site' },
      { letter: 'C', text: 'Full tunnel client' },
      { letter: 'D', text: 'GRE tunnel' },
    ],
    correct_answer: 'A',
  },
  {
    id: 376,
    type: 'multiple_choice',
    question_text:
      "An ISP provided a company with a pre-configured modem and five public static IP addresses. Which of the following does the company's firewall require to access the internet? (Choose two.)",
    options: [
      { letter: 'A', text: 'NTP server' },
      { letter: 'B', text: 'Default gateway' },
      { letter: 'C', text: "The modem's IP address" },
      { letter: 'D', text: 'One static IP address' },
      { letter: 'E', text: 'DNS servers' },
      { letter: 'F', text: 'DHCP server' },
    ],
    correct_answer: ['B', 'D'],
  },
  {
    id: 377,
    type: 'multiple_choice',
    question_text:
      "During a recent security assessment, an assessor attempts to obtain user credentials by pretending to be from the organization's help desk. Which of the following attacks is the assessor using?",
    options: [
      { letter: 'A', text: 'Social engineering' },
      { letter: 'B', text: 'Tailgating' },
      { letter: 'C', text: 'Shoulder surfing' },
      { letter: 'D', text: 'Smishing' },
      { letter: 'E', text: 'Evil twin' },
    ],
    correct_answer: 'A',
  },
  {
    id: 378,
    type: 'multiple_choice',
    question_text:
      'Which of the following dynamic routing protocols is used on the internet?',
    options: [
      { letter: 'A', text: 'EIGRP' },
      { letter: 'B', text: 'BGP' },
      { letter: 'C', text: 'RIP' },
      { letter: 'D', text: 'OSPF' },
    ],
    correct_answer: 'B',
  },
  {
    id: 379,
    type: 'multiple_choice',
    question_text:
      'A technician is implementing a new SD-WAN device with a default configuration. The technician receives a URL via email and connects the new device to the internet to complete the installation. Which of the following is this an example of?',
    options: [
      { letter: 'A', text: 'SASE device installation' },
      { letter: 'B', text: 'Zero-touch provisioning' },
      { letter: 'C', text: 'Infrastructure as code' },
      { letter: 'D', text: 'Configuration management' },
    ],
    correct_answer: 'B',
  },
  {
    id: 381,
    type: 'multiple_choice',
    question_text:
      'Which of the following would allow a network administrator to remotely access a secure subnet from a shared, secure workstation?',
    options: [
      { letter: 'A', text: 'Enable SSH through the firewall.' },
      { letter: 'B', text: 'Dial into an in-band modem.' },
      { letter: 'C', text: 'Connect through a jump host.' },
      { letter: 'D', text: 'Configure a site-to-site VPN.' },
    ],
    correct_answer: 'C',
  },
  {
    id: 382,
    type: 'multiple_choice',
    question_text:
      'Which of the following kinds of targeted attacks uses multiple computers or bots to request the same resource repeatedly?',
    options: [
      { letter: 'A', text: 'On-path' },
      { letter: 'B', text: 'DDoS' },
      { letter: 'C', text: 'ARP spoofing' },
      { letter: 'D', text: 'MAC flooding' },
    ],
    correct_answer: 'B',
  },
  {
    id: 383,
    type: 'multiple_choice',
    question_text:
      'Which of the following is the most cost-effective way to safely expand outlet capacity in an IDF?',
    options: [
      { letter: 'A', text: 'PDU' },
      { letter: 'B', text: 'Surge protector' },
      { letter: 'C', text: 'UPS' },
      { letter: 'D', text: 'Power strip' },
    ],
    correct_answer: 'A',
  },
  {
    id: 384,
    type: 'multiple_choice',
    question_text:
      'A network administrator is creating a subnet that will include 45 separate hosts on a small private network within a large network architecture. Which of the following options is the most efficient use of network addresses when assigning this network?',
    options: [
      { letter: 'A', text: '10.0.50.128/25' },
      { letter: 'B', text: '10.7.142.128/27' },
      { letter: 'C', text: '10.152.4.192/26' },
      { letter: 'D', text: '10.192.1.64/28' },
    ],
    correct_answer: 'C',
  },
  {
    id: 385,
    type: 'multiple_choice',
    question_text:
      'A network technician is troubleshooting an issue between a web server and computers within a LAN. The technician needs to gather information about the IP addresses, protocols, and content of the traffic. Which of the following will best help the technician troubleshoot the issue?',
    options: [
      { letter: 'A', text: 'Flow data' },
      { letter: 'B', text: 'SNMP traps' },
      { letter: 'C', text: 'Packet capture' },
      { letter: 'D', text: 'Server logs' },
    ],
    correct_answer: 'C',
  },
  {
    id: 386,
    type: 'multiple_choice',
    question_text:
      'Which of the following OSI model layers can utilize a connectionless protocol for data transmission?',
    options: [
      { letter: 'A', text: 'Physical' },
      { letter: 'B', text: 'Network' },
      { letter: 'C', text: 'Transport' },
      { letter: 'D', text: 'Application' },
    ],
    correct_answer: 'C',
  },
  {
    id: 387,
    type: 'multiple_choice',
    question_text:
      'Which of the following layers in the OSI model is responsible for establishing, maintaining, and terminating connections between nodes?',
    options: [
      { letter: 'A', text: 'Physical' },
      { letter: 'B', text: 'Network' },
      { letter: 'C', text: 'Session' },
      { letter: 'D', text: 'Transport' },
    ],
    correct_answer: 'C',
  },
  {
    id: 388,
    type: 'multiple_choice',
    question_text:
      'Which of the following protocols is commonly associated with TCP port 443?',
    options: [
      { letter: 'A', text: 'Telnet' },
      { letter: 'B', text: 'SMTP' },
      { letter: 'C', text: 'HTTPS' },
      { letter: 'D', text: 'SNMP' },
    ],
    correct_answer: 'C',
  },
  {
    id: 389,
    type: 'multiple_choice',
    question_text:
      'A network engineer configures the network settings in a new server as follows:\nIP address = 192.168.1.15\nSubnet mask = 255.255.255.0\nGateway = 192.168.1.255\nThe server can reach other hosts on the same subnet successfully, but it cannot reach hosts on different subnets. Which of the following is most likely configured incorrectly?',
    options: [
      { letter: 'A', text: 'Subnet mask' },
      { letter: 'B', text: 'Gateway' },
      { letter: 'C', text: 'Default route' },
      { letter: 'D', text: 'IP address' },
    ],
    correct_answer: 'B',
  },
  {
    id: 390,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to implement a solution to filter access to the internet. Which of the following should the administrator most likely implement?',
    options: [
      { letter: 'A', text: 'Router' },
      { letter: 'B', text: 'Cloud gateway' },
      { letter: 'C', text: 'Proxy' },
      { letter: 'D', text: 'Intrusion detection system' },
    ],
    correct_answer: 'C',
  },
  {
    id: 391,
    type: 'multiple_choice',
    question_text:
      "A user in the finance department reports that they cannot access the internet. Other finance department users are not having issues. A network administrator runs a route print command on the user's machine:\nIPv4 route table\nActive routes:\n[...route table entries...]\nWhich of the following is most likely the root cause of the issue?",
    options: [
      { letter: 'A', text: 'The default route is missing.' },
      { letter: 'B', text: 'The route metric value is incorrect.' },
      { letter: 'C', text: 'The interface is pointing to the localhost.' },
      {
        letter: 'D',
        text: 'The default gateway is configured with an incorrect subnet mask.',
      },
    ],
    correct_answer: 'A',
  },
  // ... 51-100
  {
    id: 51,
    type: 'multiple_choice',
    question_text:
      'Which of the following is an XML-based security concept that works by passing sensitive information about users, such as log-in information and attributes, to providers?',
    options: [
      { letter: 'A', text: 'IAM' },
      { letter: 'B', text: 'MFA' },
      { letter: 'C', text: 'RADIUS' },
      { letter: 'D', text: 'SAML' },
    ],
    correct_answer: 'D',
  },
  {
    id: 52,
    type: 'multiple_choice',
    question_text:
      'Which of the following routing technologies uses unequal cost load balancing and port 88?',
    options: [
      { letter: 'A', text: 'EIGRP' },
      { letter: 'B', text: 'BGP' },
      { letter: 'C', text: 'RIP' },
      { letter: 'D', text: 'OSPF' },
    ],
    correct_answer: 'A',
  },
  {
    id: 53,
    type: 'multiple_choice',
    question_text:
      'A wireless network consultant is deploying a large number of WAPs and wants to centrally control them from one wireless LAN controller. Which of the following network types should the consultant employ?',
    options: [
      { letter: 'A', text: 'Mesh' },
      { letter: 'B', text: 'Infrastructure' },
      { letter: 'C', text: 'Point-to-point' },
      { letter: 'D', text: 'Ad hoc' },
    ],
    correct_answer: 'B',
  },
  {
    id: 54,
    type: 'multiple_choice',
    question_text:
      'Which of the following network topologies involves sending all traffic through a single point?',
    options: [
      { letter: 'A', text: 'Mesh' },
      { letter: 'B', text: 'Hybrid' },
      { letter: 'C', text: 'Hub-and-spoke' },
      { letter: 'D', text: 'Point-to-point' },
    ],
    correct_answer: 'C',
  },
  {
    id: 55,
    type: 'multiple_choice',
    question_text:
      'Which of the following functions is used to prioritize network traffic based on the type of traffic?',
    options: [
      { letter: 'A', text: 'QoS' },
      { letter: 'B', text: 'VPN' },
      { letter: 'C', text: 'CDN' },
      { letter: 'D', text: 'TTL' },
    ],
    correct_answer: 'A',
  },
  {
    id: 56,
    type: 'multiple_choice',
    question_text:
      'Which of the following most likely determines the size of a rack for installation? (Choose two.)',
    options: [
      { letter: 'A', text: 'KVM size' },
      { letter: 'B', text: 'Switch depth' },
      { letter: 'C', text: 'Hard drive size' },
      { letter: 'D', text: 'Cooling fan speed' },
      { letter: 'E', text: 'Outlet amperage' },
      { letter: 'F', text: 'Server height' },
    ],
    correct_answer: ['B', 'F'],
  },
  {
    id: 57,
    type: 'multiple_choice',
    question_text:
      'A network administrator is planning to implement device monitoring to enhance network visibility. The security team requires that the solution provides authentication and encryption. Which of the following meets these requirements?',
    options: [
      { letter: 'A', text: 'SIEM' },
      { letter: 'B', text: 'Syslog' },
      { letter: 'C', text: 'NetFlow' },
      { letter: 'D', text: 'SNMPv3' },
    ],
    correct_answer: 'D',
  },
  {
    id: 58,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to change where the outside DNS records are hosted. Which of the following records should the administrator change at the registrar to accomplish this task?',
    options: [
      { letter: 'A', text: 'NS' },
      { letter: 'B', text: 'SOA' },
      { letter: 'C', text: 'PTR' },
      { letter: 'D', text: 'CNAME' },
    ],
    correct_answer: 'A',
  },
  {
    id: 59,
    type: 'multiple_choice',
    question_text:
      "A support agent receives a report that a remote user's wired devices are constantly disconnecting and have slow speeds. Upon inspection, the support agent sees that the user's coaxial modem has a signal power of -97dB. Which of the following should the support agent recommend to troubleshoot the issue?",
    options: [
      { letter: 'A', text: 'Removing any splitters connected to the line' },
      { letter: 'B', text: 'Switching the devices to wireless' },
      { letter: 'C', text: 'Moving the devices closer to the modem' },
      { letter: 'D', text: 'Lowering the network speed' },
    ],
    correct_answer: 'A',
  },
  {
    id: 60,
    type: 'multiple_choice',
    question_text:
      'Which of the following does OSPF use to communicate routing updates?',
    options: [
      { letter: 'A', text: 'Unicast' },
      { letter: 'B', text: 'Anycast' },
      { letter: 'C', text: 'Multicast' },
      { letter: 'D', text: 'Broadcast' },
    ],
    correct_answer: 'C',
  },
  {
    id: 61,
    type: 'multiple_choice',
    question_text:
      'A storage network requires reduced overhead and increased efficiency for the amount of data being sent. Which of the following should an engineer most likely configure to meet these requirements?',
    options: [
      { letter: 'A', text: 'Link speed' },
      { letter: 'B', text: 'Jumbo frames' },
      { letter: 'C', text: 'QoS' },
      { letter: 'D', text: '802.1q tagging' },
    ],
    correct_answer: 'B',
  },
  {
    id: 62,
    type: 'multiple_choice',
    question_text:
      'A security administrator is creating a new firewall object for a device with IP address 192.168.100.1/25. However, the firewall software only uses dotted decimal notation in configuration fields. Which of the following is the correct subnet mask to use?',
    options: [
      { letter: 'A', text: '255.255.254.0' },
      { letter: 'B', text: '255.255.255.1' },
      { letter: 'C', text: '255.255.255.128' },
      { letter: 'D', text: '255.255.255.192' },
    ],
    correct_answer: 'C',
  },
  {
    id: 63,
    type: 'multiple_choice',
    question_text:
      'Which of the following disaster recovery metrics describes the average length of time a piece of equipment can be expected to operate normally?',
    options: [
      { letter: 'A', text: 'RPO' },
      { letter: 'B', text: 'RTO' },
      { letter: 'C', text: 'MTTR' },
      { letter: 'D', text: 'MTBF' },
    ],
    correct_answer: 'D',
  },
  {
    id: 64,
    type: 'multiple_choice',
    question_text:
      'A network administrator logs on to a router and sees an interface with an IP address of 10.61.52.34 255.255.255.252. Which of the following best describes how this interface IP address is being used?',
    options: [
      { letter: 'A', text: 'As a point-to-point connection' },
      { letter: 'B', text: 'To connect to the internet' },
      { letter: 'C', text: 'As a virtual address for redundancy' },
      { letter: 'D', text: 'For out-of-band management' },
    ],
    correct_answer: 'A',
  },
  {
    id: 65,
    type: 'multiple_choice',
    question_text:
      'A network technician is troubleshooting a faulty NIC and tests the theory. Which of the following should the technician do next?',
    options: [
      { letter: 'A', text: 'Develop a theory.' },
      { letter: 'B', text: 'Establish a plan of action.' },
      { letter: 'C', text: 'Implement the solution.' },
      { letter: 'D', text: 'Document the findings.' },
    ],
    correct_answer: 'B',
  },
  {
    id: 66,
    type: 'multiple_choice',
    question_text:
      'A network administrator is configuring access points for installation in a dense environment where coverage is often overlapping. Which of the following channel widths should the administrator choose to help minimize interference in the 2.4GHz spectrum?',
    options: [
      { letter: 'A', text: '11MHz' },
      { letter: 'B', text: '20MHz' },
      { letter: 'C', text: '40MHz' },
      { letter: 'D', text: '80MHz' },
      { letter: 'E', text: '160MHz' },
    ],
    correct_answer: 'B',
  },
  {
    id: 67,
    type: 'multiple_choice',
    question_text:
      'A network manager wants to view network traffic for devices connected to a switch. A network engineer connects an appliance to a free port on the switch and needs to configure the switch port connected to the appliance. Which of the following is the best option for the engineer to enable?',
    options: [
      { letter: 'A', text: 'Trunking' },
      { letter: 'B', text: 'Port mirroring' },
      { letter: 'C', text: 'Full duplex' },
      { letter: 'D', text: 'SNMP' },
    ],
    correct_answer: 'B',
  },
  {
    id: 68,
    type: 'multiple_choice',
    question_text:
      'A network administrator is in the process of installing 35 PoE security cameras. After the administrator installed and tested the new cables, the administrator installed the cameras. However, a small number of the cameras do not work. Which of the following is the most likely reason?',
    options: [
      { letter: 'A', text: 'Incorrect wiring standard' },
      { letter: 'B', text: 'Power budget exceeded' },
      { letter: 'C', text: 'Signal attenuation' },
      { letter: 'D', text: 'Wrong voltage' },
    ],
    correct_answer: 'B',
  },
  {
    id: 69,
    type: 'multiple_choice',
    question_text:
      'A network administrator is troubleshooting an application issue after a firewall change. The administrator has confirmed that the port and protocol are accessible to the user, but the application is still having issues. Which of the following tools allows the administrator to look at traffic on the application layer of the OSI model?',
    options: [
      { letter: 'A', text: 'ifconfig' },
      { letter: 'B', text: 'tcpdump' },
      { letter: 'C', text: 'nslookup' },
      { letter: 'D', text: 'traceroute' },
    ],
    correct_answer: 'B',
  },
  {
    id: 70,
    type: 'multiple_choice',
    question_text:
      'Which of the following ports should a network administrator enable for encrypted log-in to a network switch?',
    options: [
      { letter: 'A', text: '22' },
      { letter: 'B', text: '23' },
      { letter: 'C', text: '80' },
      { letter: 'D', text: '123' },
    ],
    correct_answer: 'A',
  },
  {
    id: 71,
    type: 'multiple_choice',
    question_text:
      'Which of the following is used to stage copies of a website closer to geographically dispersed users?',
    options: [
      { letter: 'A', text: 'VPN' },
      { letter: 'B', text: 'CDN' },
      { letter: 'C', text: 'SAN' },
      { letter: 'D', text: 'SDN' },
    ],
    correct_answer: 'B',
  },
  {
    id: 72,
    type: 'multiple_choice',
    question_text:
      'Which of the following appliances provides users with an extended footprint that allows connections from multiple devices within a designated WLAN?',
    options: [
      { letter: 'A', text: 'Router' },
      { letter: 'B', text: 'Switch' },
      { letter: 'C', text: 'Access point' },
      { letter: 'D', text: 'Firewall' },
    ],
    correct_answer: 'C',
  },
  {
    id: 73,
    type: 'multiple_choice',
    question_text:
      'An administrator is configuring a switch that will be placed in an area of the office that is accessible to customers. Which of the following is the best way for the administrator to mitigate unknown devices from connecting to the network?',
    options: [
      { letter: 'A', text: 'SSE' },
      { letter: 'B', text: 'ACL' },
      { letter: 'C', text: 'Perimeter network' },
      { letter: 'D', text: '802.1X' },
    ],
    correct_answer: 'D',
  },
  {
    id: 74,
    type: 'multiple_choice',
    question_text:
      'Which of the following diagrams would most likely include specifications about fiber connector types?',
    options: [
      { letter: 'A', text: 'Logical' },
      { letter: 'B', text: 'Physical' },
      { letter: 'C', text: 'Rack' },
      { letter: 'D', text: 'Routing' },
    ],
    correct_answer: 'B',
  },
  {
    id: 75,
    type: 'multiple_choice',
    question_text:
      'Which of the following is the most likely reason an insurance brokerage would enforce VPN usage?',
    options: [
      { letter: 'A', text: 'To encrypt sensitive data in transit' },
      { letter: 'B', text: 'To secure the endpoints' },
      { letter: 'C', text: 'To maintain contractual agreements' },
      { letter: 'D', text: 'To comply with data retention requirements' },
    ],
    correct_answer: 'A',
  },
  {
    id: 76,
    type: 'multiple_choice',
    question_text:
      "An organization moved its DNS servers to new IP addresses. After this move, customers are no longer able to access the organization's website. Which of the following DNS entries should be updated?",
    options: [
      { letter: 'A', text: 'AAA' },
      { letter: 'B', text: 'CNAME' },
      { letter: 'C', text: 'MX' },
      { letter: 'D', text: 'NS' },
    ],
    correct_answer: 'D',
  },
  {
    id: 77,
    type: 'multiple_choice',
    question_text:
      'Which of the following are environmental factors that should be considered when installing equipment in a building? (Choose two.)',
    options: [
      { letter: 'A', text: 'Fire suppression system' },
      { letter: 'B', text: 'UPS location' },
      { letter: 'C', text: 'Humidity control' },
      { letter: 'D', text: 'Power load' },
      { letter: 'E', text: 'Floor construction type' },
      { letter: 'F', text: 'Proximity to nearest MDF' },
    ],
    correct_answer: ['A', 'C'],
  },
  {
    id: 78,
    type: 'multiple_choice',
    question_text:
      'A customer lost the connection to the telephone system. The administration console is configured with multiple network interfaces and is connected to multiple switches. The network administrator troubleshoots and verifies the following:\nThe support team is able to connect remotely to the administration console.\nRebooting the switch shows solid link and activity lights even on unused ports.\nRebooting the telephone system does not bring the system back online.\nThe console is able to connect directly to individual modules successfully.\nWhich of the following is the most likely reason the customer lost the connection?',
    options: [
      { letter: 'A', text: 'A switch failed.' },
      { letter: 'B', text: 'The console software needs to be reinstalled.' },
      { letter: 'C', text: 'The cables to the modules need to be replaced.' },
      { letter: 'D', text: 'A module failed.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 79,
    type: 'multiple_choice',
    question_text:
      'A systems administrator is configuring a new device to be added to the network. The administrator is planning to perform device hardening prior to connecting the device. Which of the following should the administrator do first?',
    options: [
      { letter: 'A', text: 'Update the network ACLS.' },
      { letter: 'B', text: 'Place the device in a screened subnet.' },
      { letter: 'C', text: 'Enable content filtering.' },
      { letter: 'D', text: 'Change the default admin passwords.' },
    ],
    correct_answer: 'D',
  },
  {
    id: 80,
    type: 'multiple_choice',
    question_text:
      'A network administrator needs to connect two network closets that are 492ft (150m) away from each other. Which of the following cable types should the administrator install between the closets?',
    options: [
      { letter: 'A', text: 'Single-mode fiber' },
      { letter: 'B', text: 'Coaxial' },
      { letter: 'C', text: 'DAC' },
      { letter: 'D', text: 'STP' },
    ],
    correct_answer: 'A',
  },
  {
    id: 81,
    type: 'multiple_choice',
    question_text:
      'An IT manager needs to connect ten sites in a mesh network. Each needs to be secured with reduced provisioning time. Which of the following technologies will best meet this requirement?',
    options: [
      { letter: 'A', text: 'SD-WAN' },
      { letter: 'B', text: 'VXLAN' },
      { letter: 'C', text: 'VPN' },
      { letter: 'D', text: 'NFV' },
    ],
    correct_answer: 'A',
  },
  {
    id: 82,
    type: 'multiple_choice',
    question_text:
      'Which of the following is most likely responsible for the security and handling of personal data in Europe?',
    options: [
      { letter: 'A', text: 'GDPR' },
      { letter: 'B', text: 'SCADA' },
      { letter: 'C', text: 'SAML' },
      { letter: 'D', text: 'PCI DSS' },
    ],
    correct_answer: 'A',
  },
  {
    id: 83,
    type: 'multiple_choice',
    question_text:
      'An organization has a security requirement that all network connections can be traced back to a user. A network administrator needs to identify a solution to implement on the wireless network. Which of the following is the best solution?',
    options: [
      { letter: 'A', text: 'Implementing enterprise authentication' },
      { letter: 'B', text: 'Requiring the use of PSKs' },
      { letter: 'C', text: 'Configuring a captive portal for users' },
      { letter: 'D', text: 'Enforcing wired equivalent protection' },
    ],
    correct_answer: 'A',
  },
  {
    id: 84,
    type: 'multiple_choice',
    question_text:
      'A customer is adding fiber connectivity between adjacent buildings. A technician terminates the multimode cable to the fiber patch panel. After the technician connects the fiber patch cable, the indicator light does not turn on. Which of the following should a technician try first to troubleshoot this issue?',
    options: [
      { letter: 'A', text: 'Reverse the fibers.' },
      { letter: 'B', text: 'Reterminate the fibers.' },
      { letter: 'C', text: 'Verify the fiber size.' },
      { letter: 'D', text: 'Examine the cable runs for visual faults.' },
    ],
    correct_answer: 'A',
  },
  {
    id: 85,
    type: 'multiple_choice',
    question_text:
      'Users cannot connect to an internal website with an IP address 10.249.3.76. A network administrator runs a command and receives the following output:\n1 3ms 2ms 3ms 192.168.25.234\n2 2ms 3ms 1ms 192.168.3.100\n3 4ms 5ms 2ms 10.249.3.1\n4 * * *\n5 * * *\n6 * * *\n7 * * *\nWhich of the following command-line tools is the network administrator using?',
    options: [
      { letter: 'A', text: 'tracert' },
      { letter: 'B', text: 'netstat' },
      { letter: 'C', text: 'tcpdump' },
      { letter: 'D', text: 'nmap' },
    ],
    correct_answer: 'A',
  },
  {
    id: 86,
    type: 'multiple_choice',
    question_text:
      'After running a Cat 8 cable using passthrough plugs, an electrician notices that connected cables are experiencing a lot of cross talk. Which of the following troubleshooting steps should the electrician take first?',
    options: [
      {
        letter: 'A',
        text: 'Inspect the connectors for any wires that are touching or exposed.',
      },
      {
        letter: 'B',
        text: 'Restore default settings on the connected devices.',
      },
      { letter: 'C', text: 'Terminate the connections again.' },
      {
        letter: 'D',
        text: 'Check for radio frequency interference in the area.',
      },
    ],
    correct_answer: 'A',
  },
  {
    id: 87,
    type: 'multiple_choice',
    question_text:
      "A technician is troubleshooting a user's laptop that is unable to connect to a corporate server. The technician thinks the issue pertains to routing. Which of the following commands should the technician use to identify the issue?",
    options: [
      { letter: 'A', text: 'tcpdump' },
      { letter: 'B', text: 'dig' },
      { letter: 'C', text: 'tracert' },
      { letter: 'D', text: 'arp' },
    ],
    correct_answer: 'C',
  },
  {
    id: 88,
    type: 'multiple_choice',
    question_text:
      'After installing a series of Cat 8 keystones, a data center architect notices higher than normal interference during tests. Which of the following steps should the architect take to troubleshoot the issue?',
    options: [
      {
        letter: 'A',
        text: 'Check to see if the end connections were wrapped in copper tape before terminating.',
      },
      {
        letter: 'B',
        text: 'Use passthrough modular crimping plugs instead of traditional crimping plugs.',
      },
      { letter: 'C', text: 'Connect the RX/TX wires to different pins.' },
      {
        letter: 'D',
        text: 'Run a speed test on a device that can only achieve 100Mbps speeds.',
      },
    ],
    correct_answer: 'A',
  },
  {
    id: 89,
    type: 'multiple_choice',
    question_text:
      'A small business is deploying new phones, and some of the phones have full HD videoconferencing features. The Chief Information Officer is concerned that the network might not be able to handle the traffic if the traffic reaches a certain threshold. Which of the following can the network engineer configure to help ease these concerns?',
    options: [
      { letter: 'A', text: 'A VLAN with 100Mbps speed limits' },
      { letter: 'B', text: 'An IP helper to direct VoIP traffic' },
      { letter: 'C', text: 'A smaller subnet mask' },
      { letter: 'D', text: 'Full duplex on all user ports' },
    ],
    correct_answer: 'A',
  },
  {
    id: 90,
    type: 'multiple_choice',
    question_text:
      'A virtual machine has the following configuration:\nIPv4 address: 169.254.10.10\nSubnet mask: 255.255.0.0\nThe virtual machine can reach collocated systems but cannot reach external addresses on the internet. Which of the following is most likely the root cause?',
    options: [
      { letter: 'A', text: 'The subnet mask is incorrect.' },
      { letter: 'B', text: 'The DHCP server is offline.' },
      { letter: 'C', text: 'The IP address is an RFC1918 private address.' },
      { letter: 'D', text: 'The DNS server is unreachable.' },
    ],
    correct_answer: 'B',
  },
  {
    id: 91,
    type: 'multiple_choice',
    question_text:
      'Which of the following is used to estimate the average life span of a device?',
    options: [
      { letter: 'A', text: 'RPO' },
      { letter: 'B', text: 'RTO' },
      { letter: 'C', text: 'MTTR' },
      { letter: 'D', text: 'MTBF' },
    ],
    correct_answer: 'D',
  },
  {
    id: 92,
    type: 'multiple_choice',
    question_text:
      'Which of the following is the most secure way to provide site-to-site connectivity?',
    options: [
      { letter: 'A', text: 'VXLAN' },
      { letter: 'B', text: 'IKE' },
      { letter: 'C', text: 'GRE' },
      { letter: 'D', text: 'IPSec' },
    ],
    correct_answer: 'D',
  },
  {
    id: 93,
    type: 'multiple_choice',
    question_text:
      'A network technician is terminating a cable to a fiber patch panel in the MDF. Which of the following connector types is most likely in use?',
    options: [
      { letter: 'A', text: 'F-type' },
      { letter: 'B', text: 'RJ11' },
      { letter: 'C', text: 'BNC' },
      { letter: 'D', text: 'SC' },
    ],
    correct_answer: 'D',
  },
  {
    id: 94,
    type: 'multiple_choice',
    question_text:
      'A network administrator is connecting two Layer 2 switches in a network. These switches must transfer data in multiple networks. Which of the following would fulfill this requirement?',
    options: [
      { letter: 'A', text: 'Jumbo frames' },
      { letter: 'B', text: '802.1Q tagging' },
      { letter: 'C', text: 'Native VLAN' },
      { letter: 'D', text: 'Link aggregation' },
    ],
    correct_answer: 'B',
  },
  {
    id: 95,
    type: 'multiple_choice',
    question_text:
      'A network administrator wants users to be able to authenticate to the corporate network using a port-based authentication framework when accessing both wired and wireless devices. Which of the following is the best security feature to accomplish this task?',
    options: [
      { letter: 'A', text: '802.1X' },
      { letter: 'B', text: 'Access control list' },
      { letter: 'C', text: 'Port security' },
      { letter: 'D', text: 'MAC filtering' },
    ],
    correct_answer: 'A',
  },
  {
    id: 96,
    type: 'multiple_choice',
    question_text:
      'Which of the following is most closely associated with a dedicated link to a cloud environment and may not include encryption?',
    options: [
      { letter: 'A', text: 'Direct Connect' },
      { letter: 'B', text: 'Internet gateway' },
      { letter: 'C', text: 'Captive portal' },
      { letter: 'D', text: 'VPN' },
    ],
    correct_answer: 'A',
  },
  {
    id: 97,
    type: 'multiple_choice',
    question_text:
      'A systems administrator is investigating why users cannot reach a Linux web server with a browser but can ping the server IP. The server is online, the web server process is running, and the link to the switch is up. Which of the following commands should the administrator run on the server first?',
    options: [
      { letter: 'A', text: 'traceroute' },
      { letter: 'B', text: 'netstat' },
      { letter: 'C', text: 'tcpdump' },
      { letter: 'D', text: 'arp' },
    ],
    correct_answer: 'B',
  },
  {
    id: 98,
    type: 'multiple_choice',
    question_text:
      'Which of the following devices can operate in multiple layers of the OSI model?',
    options: [
      { letter: 'A', text: 'Hub' },
      { letter: 'B', text: 'Switch' },
      { letter: 'C', text: 'Transceiver' },
      { letter: 'D', text: 'Modem' },
    ],
    correct_answer: 'B',
  },
  {
    id: 99,
    type: 'multiple_choice',
    question_text:
      'Before using a guest network, an administrator requires users to accept the terms of use. Which of the following is the best way to accomplish this goal?',
    options: [
      { letter: 'A', text: 'Pre-shared key' },
      { letter: 'B', text: 'Autonomous access point' },
      { letter: 'C', text: 'Captive portal' },
      { letter: 'D', text: 'WPA2 encryption' },
    ],
    correct_answer: 'C',
  },
  {
    id: 100,
    type: 'multiple_choice',
    question_text:
      'A network administrator for a small office is adding a passive IDS to its network switch for the purpose of inspecting network traffic. Which of the following should the administrator use?',
    options: [
      { letter: 'A', text: 'SNMP trap' },
      { letter: 'B', text: 'Port mirroring' },
      { letter: 'C', text: 'Syslog collection' },
      { letter: 'D', text: 'API integration' },
    ],
    correct_answer: 'B',
  },
]
const QUESTIONS = RAW_DATA.filter(
  (q) => q.options && q.options.length > 0
).sort((a, b) => a.id - b.id)

const MenuButton = ({ icon: Icon, title, onClick, color }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105 active:scale-95 ${color} text-white w-full h-40`}
  >
    <Icon size={48} className="mb-3" />
    <span className="text-xl font-bold">{title}</span>
  </button>
)

const QuestionCard = ({
  question,
  showAnswer,
  toggleAnswer,
  onNext,
  onPrev,
  canNext,
  canPrev,
  jumpToQuestion,
  totalQuestions,
  currentIndex,
}) => {
  const [jumpVal, setJumpVal] = useState('')

  const handleJump = (e) => {
    e.preventDefault()
    const val = parseInt(jumpVal)
    if (val >= 1 && val <= totalQuestions) {
      jumpToQuestion(val - 1)
      setJumpVal('')
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
        <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <form onSubmit={handleJump} className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Go to #"
            className="w-20 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={jumpVal}
            onChange={(e) => setJumpVal(e.target.value)}
            min="1"
            max={totalQuestions}
          />
          <button
            type="submit"
            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            <ArrowRight size={16} />
          </button>
        </form>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-8 leading-relaxed">
        {question.question_text}
      </h2>

      <div className="space-y-4 mb-8">
        {question.options.map((opt, idx) => {
          // Handle both string and array answers
          const isCorrect = Array.isArray(question.correct_answer)
            ? question.correct_answer.includes(opt.letter)
            : question.correct_answer === opt.letter

          const highlightClass =
            showAnswer && isCorrect
              ? 'bg-green-100 border-green-500 text-green-900'
              : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'

          return (
            <div
              key={idx}
              className={`p-4 border rounded-lg transition-colors flex items-start gap-4 ${highlightClass}`}
            >
              <span
                className={`font-bold min-w-[1.5rem] mt-0.5 ${
                  showAnswer && isCorrect ? 'text-green-700' : 'text-gray-500'
                }`}
              >
                {opt.letter}.
              </span>
              <span className="text-lg">{opt.text}</span>
            </div>
          )
        })}
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-100">
        <button
          onClick={onPrev}
          disabled={!canPrev}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            canPrev
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              : 'bg-gray-50 text-gray-300 cursor-not-allowed'
          }`}
        >
          <ArrowLeft size={20} /> Previous
        </button>

        <button
          onClick={toggleAnswer}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium transition-colors"
        >
          {showAnswer ? <EyeOff size={20} /> : <Eye size={20} />}
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>

        <button
          onClick={onNext}
          disabled={!canNext}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            canNext
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
          }`}
        >
          Next <ArrowRight size={20} />
        </button>
      </div>
    </div>
  )
}

const QuizCard = ({ question, selectedAnswer, onSelect, quizSubmitted }) => {
  const isCorrect = Array.isArray(question.correct_answer)
    ? Array.isArray(selectedAnswer) &&
      selectedAnswer.length === question.correct_answer.length &&
      selectedAnswer.every((val) => question.correct_answer.includes(val))
    : selectedAnswer === question.correct_answer

  const handleMultiSelect = (letter) => {
    if (quizSubmitted) return

    let currentSelection = Array.isArray(selectedAnswer)
      ? [...selectedAnswer]
      : []

    if (currentSelection.includes(letter)) {
      currentSelection = currentSelection.filter((l) => l !== letter)
    } else {
      // Limit selection to number of correct answers for this specific question
      if (currentSelection.length < question.correct_answer.length) {
        currentSelection.push(letter)
      }
    }
    onSelect(question.id, currentSelection)
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-6 mb-6 border-l-4 ${
        quizSubmitted
          ? isCorrect
            ? 'border-green-500'
            : 'border-red-500'
          : 'border-blue-500'
      }`}
    >
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        <span className="font-bold text-gray-400 mr-2">#{question.id}</span>
        {question.question_text}
      </h3>

      <div className="space-y-3">
        {question.options.map((opt) => {
          const isMulti = Array.isArray(question.correct_answer)
          const isSelected = isMulti
            ? Array.isArray(selectedAnswer) &&
              selectedAnswer.includes(opt.letter)
            : selectedAnswer === opt.letter

          const isActuallyCorrect = isMulti
            ? question.correct_answer.includes(opt.letter)
            : question.correct_answer === opt.letter

          let cardClass = 'border-gray-200 hover:bg-gray-50'

          if (quizSubmitted) {
            if (isActuallyCorrect)
              cardClass = 'bg-green-100 border-green-500 text-green-900'
            else if (isSelected && !isActuallyCorrect)
              cardClass = 'bg-red-100 border-red-500 text-red-900'
            else cardClass = 'bg-gray-50 border-gray-200 opacity-60'
          } else if (isSelected) {
            cardClass = 'bg-blue-50 border-blue-500 ring-1 ring-blue-500'
          }

          return (
            <div
              key={opt.letter}
              onClick={() => {
                if (isMulti) {
                  handleMultiSelect(opt.letter)
                } else if (!quizSubmitted) {
                  onSelect(question.id, opt.letter)
                }
              }}
              className={`p-4 border rounded-lg cursor-pointer transition-all flex items-center gap-4 ${cardClass}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border flex-shrink-0 ${
                  isSelected
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}
              >
                {isSelected && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="font-medium text-lg">{opt.letter}.</span>
              <span className="text-lg">{opt.text}</span>
            </div>
          )
        })}
      </div>
      {quizSubmitted && !isCorrect && (
        <div className="mt-4 text-sm text-red-600 font-medium flex items-center gap-2">
          <XCircle size={16} />
          Correct Answer:{' '}
          {Array.isArray(question.correct_answer)
            ? question.correct_answer.join(', ')
            : question.correct_answer}
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [view, setView] = useState('menu') // menu, study, quiz
  const [studyIndex, setStudyIndex] = useState(0)
  const [showStudyAnswer, setShowStudyAnswer] = useState(false)

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState([])
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  // Inject viewport meta tag to ensure mobile/desktop scaling is correct
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = 'width=device-width, initial-scale=1.0'
    document.head.appendChild(meta)
    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  // Load progress on mount
  useEffect(() => {
    const savedIndex = localStorage.getItem('study_progress')
    if (savedIndex) {
      const idx = parseInt(savedIndex)
      if (!isNaN(idx) && idx >= 0 && idx < QUESTIONS.length) {
        setStudyIndex(idx)
      }
    }
  }, [])

  // Save progress
  useEffect(() => {
    if (view === 'study') {
      localStorage.setItem('study_progress', studyIndex)
    }
  }, [studyIndex, view])

  const startQuiz = (count) => {
    // Ensure we don't try to get more questions than available
    const safeCount = Math.min(count, QUESTIONS.length)
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random())
    setQuizQuestions(shuffled.slice(0, safeCount))
    setQuizAnswers({})
    setQuizSubmitted(false)
    setQuizScore(0)
    setView('quiz')
  }

  const submitQuiz = () => {
    let correctCount = 0
    quizQuestions.forEach((q) => {
      const userAns = quizAnswers[q.id]
      const correctAns = q.correct_answer

      let isCorrect = false
      if (Array.isArray(correctAns)) {
        // Handle multiple choice (arrays)
        if (
          Array.isArray(userAns) &&
          userAns.length === correctAns.length &&
          userAns.every((val) => correctAns.includes(val))
        ) {
          isCorrect = true
        }
      } else {
        // Single choice
        if (userAns === correctAns) {
          isCorrect = true
        }
      }

      if (isCorrect) correctCount++
    })

    setQuizScore(Math.round((correctCount / quizQuestions.length) * 100))
    setQuizSubmitted(true)
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setView('menu')}
            role="button"
          >
            <BookOpen className="text-blue-600" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Network+ <span className="font-light text-gray-500">009</span>
            </h1>
          </div>
          {view !== 'menu' && (
            <button
              onClick={() => setView('menu')}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
            >
              <Home size={20} />
            </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {view === 'menu' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-800">
                Welcome back!
              </h2>
              <p className="text-gray-500">
                Choose a mode to begin your study session.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MenuButton
                icon={BookOpen}
                title="Study Mode"
                color="bg-gradient-to-br from-blue-500 to-blue-600"
                onClick={() => setView('study')}
              />

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-center h-40">
                <div className="flex items-center gap-3 mb-4 text-indigo-600">
                  <CheckCircle size={24} />
                  <span className="text-xl font-bold">Take a Quiz</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[10, 15, 20].map((count) => (
                    <button
                      key={count}
                      onClick={() => startQuiz(count)}
                      className="py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold transition-colors border border-indigo-100 text-sm"
                    >
                      {count} Qs
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="flex items-center justify-between px-6 py-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <Hash className="text-gray-400" />
                <span className="text-sm font-medium text-gray-600">
                  Total Questions Available
                </span>
              </div>
              <span className="text-lg font-bold text-gray-800">
                {QUESTIONS.length}
              </span>
            </div>
          </div>
        )}

        {view === 'study' && QUESTIONS.length > 0 && (
          <div className="space-y-6">
            <QuestionCard
              question={QUESTIONS[studyIndex]}
              showAnswer={showStudyAnswer}
              toggleAnswer={() => setShowStudyAnswer(!showStudyAnswer)}
              onNext={() => {
                setStudyIndex((i) => Math.min(QUESTIONS.length - 1, i + 1))
                setShowStudyAnswer(false)
              }}
              onPrev={() => {
                setStudyIndex((i) => Math.max(0, i - 1))
                setShowStudyAnswer(false)
              }}
              canNext={studyIndex < QUESTIONS.length - 1}
              canPrev={studyIndex > 0}
              jumpToQuestion={(idx) => {
                setStudyIndex(idx)
                setShowStudyAnswer(false)
              }}
              totalQuestions={QUESTIONS.length}
              currentIndex={studyIndex}
            />
          </div>
        )}

        {view === 'quiz' && (
          <div className="max-w-4xl mx-auto">
            {quizSubmitted && (
              <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 text-center border-b-4 border-indigo-500">
                <Trophy size={48} className="mx-auto text-yellow-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Quiz Complete!
                </h2>
                <div className="text-5xl font-black text-indigo-600 mb-4">
                  {quizScore}%
                </div>
                <p className="text-gray-500">
                  You scored{' '}
                  <span className="font-bold text-gray-800">
                    {Math.round((quizScore / 100) * quizQuestions.length)}
                  </span>{' '}
                  out of{' '}
                  <span className="font-bold text-gray-800">
                    {quizQuestions.length}
                  </span>
                </p>
                <button
                  onClick={() => setView('menu')}
                  className="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Back to Menu
                </button>
              </div>
            )}

            <div className="space-y-6">
              {quizQuestions.map((q, i) => (
                <QuizCard
                  key={q.id}
                  question={q}
                  selectedAnswer={quizAnswers[q.id]}
                  onSelect={(qId, ans) =>
                    setQuizAnswers((prev) => ({ ...prev, [qId]: ans }))
                  }
                  quizSubmitted={quizSubmitted}
                />
              ))}
            </div>

            {!quizSubmitted && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={submitQuiz}
                  disabled={
                    Object.keys(quizAnswers).length !== quizQuestions.length
                  }
                  className={`px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                    Object.keys(quizAnswers).length === quizQuestions.length
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:scale-105'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Submit Quiz
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
