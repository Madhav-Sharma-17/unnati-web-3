"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Calendar } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

const eventCategories = [
  {
    category: "Parliamentary Visit",
    items: [
      {
        name: "1500 students visited Parliament",
        year: 2023,
        description:
          "A parliamentary visit was organized by Team Unnati. Team Unnati believes in secular and demographic work mode. Visits in such a way are organized more often to keep the interns connected with the country and experience the importance and height of Unnati, while working with the aided system of government of India. Moreover, 1500 students and interns participated in the event. We never miss a chance to learn from the best. Team UNNATI, recently, hosted a visit to the parliamentary for its hardworking and talented interns. We believe in a secular and demographic work mode. Such visits are organised to help the interns, the youth of the country, to connect and establish a clear understanding of the working of the government. More than 1500 of us went to the parliament and had a knowledgeable session. The team was honoured to visit and learn from one of the most prestigious place itself. The essence of debates came clearer and louder to us when we saw the real place ourselves.",
      },
    ],
  },
  {
    category: "Interactive Session with Civil Service Officers",
    items: [
      {
        name: "1700 students at Hans Raj College",
        year: 2023,
        description:
          "An Interactive Session was organized by Team Unnati. The event was successfully drawn to a close with the support of Dr. Rama, Principal of Hans Raj College. More than 1700 students participated in the event. We work hard and our best to achieve what we want. Team UNNATI organised an interactive session for the aspiring civil aspirants. The event held at Hans Raj College proved to be a great learning opportunity for the young hard workers who got to learn from their ideal: CIVIL OFFICERS. The audience also had the opportunity to ask and interact with guests who responded to them with utmost enthusiasm and sincerity. The event was successfully drawn to a close with the support of Dr. Rama, Principal of Hans Raj College.",
      },
    ],
  },
  {
    category: "Parliamentary Debate",
    items: [
      {
        name: "1300 students showcased debating skills",
        year: 2023,
        description:
          "For and against gives birth to a parley. A good parliament is built with good debaters. To provide a platform to many young debaters to showcase their talent, Team Unnati organized a Parliamentary Debate, where students from all over India participated in a huge figure. The chief guest for the event was Sharmishtha Mukherjee Ji, spokesperson of AICC; the guiding mentor for the event was Amrita Dhawan Ji, President of NSUI. The event was enthralling, not just for the debaters but also the judges who were actually moved by the thought and words of the young children. They were surprised by the enthusiasm shown by the youngsters and the way they presented their research. The event ended auspiciously with the participation of more than 1300 students who learnt to speak and present their matter.",
      },
    ],
  },
  {
    category: "Run For Education Excellence",
    items: [
      {
        name: "2000 students 6km marathon",
        year: 2023,
        description:
          "To promote education among different sections of society, team Unnati organized Run For Education Excellence event. To cheer up the spirits of the participants, the Youth icon Mr. Harsh Beniwal was present at the event. Over 2000 students partook in the event. Keeping this mantra in mind Unnati kept on doing good deeds like when Unnati organized 'Run for Educational Excellence', a 6 km marathon for generating proceeds for charity and adopting a slum, today known as Udyat. This particular deed was noticed by Inshorts the app providing inclusives in sixty words. We hope that the good work we do keeps on coming around in such recognition.",
      },
    ],
  },
  {
    category: "Erudite: The Quiz",
    items: [
      {
        name: "2500 students in quiz competition",
        year: 2023,
        description:
          "A quiz competition was organized by Team Unnati, where IPS Officers Mr. Sudhir and Mr. Amit played the role of quizmasters and conducted the entire quiz. The guests for the event were famous YouTubers Mr. Amit Bhadana and Mr. Harsh Deep Ahuja. The chief guest for the event was Mr. Amitabh Khare, IAS Officer. The quiz was conducted with the approval of officers to provide fair competition to the participants. More than 2500 students associated themselves with the event. Unnati: The knowledge hub for civil aspirants, aims to provide free guidance and help to the civil aspirants. A quiz was conducted for the same which focused on the major topics tested in the exam. We had IPS Officers: Mr. Sudhir and Mr. Amit who conducted the quiz. The quizmasters boosted the young participants and made the quiz very interactive. The guests for the event were famous YouTubers Mr. Amit Bhadana and Mr. Harsh Deep Ahuja who provided great support to the participants. The Chief guest: Mr. Amitabh Khare, IAS officer, provided guidance and support to those answering in the quiz. He also ensured a fair conduct. All the members had a knowledge enriching time.",
      },
    ],
  },
  {
    category: "Indo-Korean Meet",
    items: [
      {
        name: "International delegates exchange",
        year: 2023,
        description:
          "To build a better and strong relationship with Korea, Team Unnati organised an Indo Korean Meet where delegates from Korea discussed on different issues and topics related to India with different schools and University students. We learn when we speak. Team UNNATI feels proud to announce the conduction of an Indo-Korean meet. We try to learn from every where to expand the horizons of our knowledge. We were glad to meet and interact with delegates from Korea who had a chest full of knowledge to share with us. We also conducted an open debate where the delegates from Korea discussed issues of international importance with the delegates of India. We are truly gratified to them for coming and sharing their tricks and tips with us. The session will also be helpful in improving the relations between the two countries and will help in their growth and development.",
      },
    ],
  },
  {
    category: "Mahapanchayat MUN",
    items: [
      {
        name: "450 school-level delegates",
        year: 2023,
        description:
          "Mahapanchayat MUN was held by Unnati on 27th and 28th August, 2019 at Evergreen Public School where students used their oratory skills to discuss on different social issues. Young minds were molded to be better leaders. School level kids joined this event and they proved their point by a debate because debate and divergence of views can only enrich our history and culture. We motivate and guide the young minds to realise their aim and strive towards it. UNNATI organised the very first edition of MAHAPANCHAYAT MUN on August 27 and 28, 2019 at Evergreen Public School, Delhi. The national level conference hosted more than 500 delegates who debated upon serious issues of national and international importance. They were constantly motivated by the members of the experienced and extraordinary Executive Board. The two-day conference turned out to be highly fruitful for all the participants who learnt to speak and present their matter in a persuasive tone. The delegates were also rewarded with certificates and trophies for their exemplary performance. It is said, 'Kids saving the world is greater than adults saving the world.' It is important to inculcate the debate and discussion culture among the Young generation. To do that MUN can be really helpful. Unnati organizes Model United Nations in different schools, our latest venture was organizing MUN at Evergreen Public School, Vasundhara Enclave where around 450 delegates from Delhi/NCR debated and discussed on various important topics. His Excellency Rabie Narsh, the Ambassador of the Republic of Lebanon and Naveen Sharma, President International Society for Cooperation and Development gave away the prizes to the winner.",
      },
    ],
  },
  {
    category: "Career Counselling",
    items: [
      {
        name: "Expert guidance sessions",
        year: 2023,
        description:
          "Career counselling is an essential factor for identifying the real potential and guiding students towards a right career path. Students needs to know the importance of career coaching and get the right guidance before they choose any academic stream. Team Unnati took a step forward to guide the fresh minds and teach them the importance of different career options in our society. With the vast diversity of options available today, it is natural for the youngsters to get confused about the field appropriate for them. But it is very important to make the right choices at the right time so you can work towards it in a proper way. UNNATI recognises this on-growing issue of career confusion so to help the youth of India, we hosted a Career Counselling Session that provided the students with the options available and the academic requirement for these. It highly helped the students to eliminate and short list the various choices available. They all were happy to receive the guidance from some of the best experts and were glad to clear some of the doubts they had.",
      },
    ],
  },
  {
    category: "Samvidhan Se Vidhan Tak",
    items: [
      {
        name: "3-day constitutional seminar",
        year: 2023,
        description:
          "Failure to know and utilize the rights given to individuals often leads to their erosion and possibly getting themselves deeper into trouble. So one must be well aware of their Constitution and the rights that it imparts us. Samvidhan se Vidhan tak, a seminar on the rights that the Constitution gives us was organised by Unnati on 28th November 2018. One of the root causes of the continuous discontentment of the citizens is their unawareness. If they had been aware about a certain right or procedure, they would have received the justice they deserved. A common cause for all the unjust the citizens suffer is because of their lack of knowledge about their actual rights and measures. To help eradicate this issue, team UNNATI organised a session: 'Samvidhan se Vidhan Tak' that helped raise awareness, amongst the attendees, about their rights and the measures to avail these rights. The session was moderated by special guests who had high knowledge about the constitution and made the session interactive and engaging for the audience. It was a 3-day session, organised in collaboration with Jawahar Bhawan, in which the whole Constitution was read out and explained.",
      },
    ],
  },
  {
    category: "Self Analysis Test",
    items: [
      {
        name: "300 civil service aspirants",
        year: 2019,
        description:
          "Unnati believes in uplifting those aspirants who possess will but lack resources. Keeping this in mind, Unnati, conducted a workshop on How to crack Civil Service Examination followed by a short Self-Analysis Test on 10th February 2019. Around 300 aspirants of the prestigious exam turned up to be a part of the same.",
      },
    ],
  },
  {
    category: "Interaction with Entrepreneur",
    items: [
      {
        name: "Motivation and guidance session",
        year: 2023,
        description:
          "Unnati has always motivated and guided students to excel in the field of education and become an asset for this nation since long. Various initiatives have been taken for the personality development of Students. People have always appreciated our efforts to make students better citizens. Delhi govt is conducting a programme on entrepreneurship and it was our privilege to be a part of it. Mr. Manish Sisodia invited Unnati because of the things that we have done for the students. Mr. Lokesh Chugh, Founder and Chairperson was invited to interact with students and motivate them.",
      },
    ],
  },
]

export default function Events() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance text-white">Our Events</h1>
              <p className="text-xl opacity-90">A comprehensive look at Unnati initiatives and programs</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <p className="text-muted-foreground text-lg">
                Showcasing{" "}
                <span className="font-bold" style={{ color: "#070091" }}>
                  {eventCategories.length}
                </span>{" "}
                different event categories
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {eventCategories.map((cat, index) => (
              <ScrollReveal key={index} delay={index * 0.02}>
                <div className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === cat.category ? null : cat.category)}
                    className="w-full flex items-center justify-between p-6 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <Calendar className="text-accent" size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{cat.category}</h3>
                    </div>
                    {expandedCategory === cat.category ? (
                      <ChevronUp className="text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="text-primary flex-shrink-0" />
                    )}
                  </button>

                  {expandedCategory === cat.category && (
                    <div className="bg-muted border-t border-border p-6 space-y-4 animate-slideDown">
                      {cat.items.map((item, i) => (
                        <div
                          key={i}
                          className="pb-4 border-b border-border/50 last:border-b-0 last:pb-0 hover:bg-white/50 p-3 rounded transition-colors"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-foreground">{item.name}</h4>
                            <span className="text-sm text-accent font-semibold bg-accent/10 px-2 py-1 rounded">
                              {item.year}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
