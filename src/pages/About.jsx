import { motion } from 'framer-motion';
import { Cpu, Code, Briefcase, MessageSquare, Mail, Phone, MapPin } from 'lucide-react';

const team = [
  { 
    name: 'Hary Kims', 
    role: 'Business Owner', 
    icon: <Briefcase className="w-12 h-12 text-primary" />,
    description: 'Leading the vision of Harykim\'s Intertech with a focus on quality and customer satisfaction.'
  },
  { 
    name: 'Samuel Mwaniki', 
    role: 'IT Manager', 
    icon: <Cpu className="w-12 h-12 text-primary" />,
    description: 'Ensuring our technology infrastructure is robust and our products meet the highest technical standards.'
  },
  { 
    name: 'Hydrogen Bond', 
    role: 'Software Engineer', 
    icon: <Code className="w-12 h-12 text-primary" />,
    description: 'Crafting seamless digital experiences and innovative software solutions for our clients.'
  },
];

function About() {
  const whatsappNumber = "+254118477340";
  const whatsappMessage = encodeURIComponent("Hello, I have an enquiry about your products.");
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-primary py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            About Harykim's Intertech
          </motion.h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Your premier destination for high-quality laptops, computer accessories, and innovative technology solutions in Kenya.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
                At Harykim's Intertech, we are committed to bridging the digital divide by providing affordable, high-quality technology to everyone. We believe that technology should empower people and businesses to reach their full potential.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                We source only the best products from trusted global brands, ensuring that our customers receive genuine hardware and reliable support.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-4 text-primary">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1 rounded-full text-primary mt-1">✓</div>
                  <span>Genuine products from top global brands</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1 rounded-full text-primary mt-1">✓</div>
                  <span>Expert technical support and guidance</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1 rounded-full text-primary mt-1">✓</div>
                  <span>Fast and reliable delivery across Kenya</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1 rounded-full text-primary mt-1">✓</div>
                  <span>Competitive pricing and flexible payment options</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Meet Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all"
              >
                <div className="mb-6 flex justify-center">{member.icon}</div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Have questions about our products or services? We're here to help!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                <Phone size={24} />
              </div>
              <h4 className="font-bold mb-2">Call Us</h4>
              <p>{whatsappNumber}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                <Mail size={24} />
              </div>
              <h4 className="font-bold mb-2">Email Us</h4>
              <p>hkintertech22@gmail.com</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                <MapPin size={24} />
              </div>
              <h4 className="font-bold mb-2">Visit Us</h4>
              <p>Nairobi, Kenya</p>
            </div>
          </div>

          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors shadow-lg"
          >
            <MessageSquare size={24} />
            Contact us on WhatsApp
          </motion.a>
        </div>
      </section>
    </div>
  );
}

export default About;