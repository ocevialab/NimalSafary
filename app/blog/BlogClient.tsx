"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "@/app/Components/Nav";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
}

// Sample blog data - replace with your actual data source
const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Ultimate Safari Guide: Spotting Leopards in Yala National Park",
      excerpt:
        "Embark on an unforgettable safari adventure in Yala National Park, where nature's most elusive predator awaits. Discover the secrets of finding leopards in their natural habitat, including the best safari times, prime locations, and expert tips from our experienced safari guides.",
      content: `Embark on an extraordinary safari journey into the heart of Yala National Park, where the untamed wilderness of Sri Lanka comes alive. Yala stands as one of the premier safari destinations globally for leopard spotting, offering nature enthusiasts an unparalleled opportunity to observe these magnificent big cats in their natural habitat. With a population of over 40 leopards residing within the park's boundaries, Yala National Park boasts one of the highest leopard densities in the world, making it an exceptional location for wildlife photography and authentic safari experiences that connect you with nature's raw beauty.

## Understanding Leopard Behavior in Yala

Leopards in Yala National Park have adapted to the diverse ecosystems within the park, which include dense forests, open grasslands, rocky outcrops, and water bodies. These adaptable predators are primarily crepuscular, meaning they are most active during dawn and dusk hours. Understanding their behavioral patterns significantly increases your chances of successful sightings.

### Optimal Viewing Times

The best time to spot leopards in Yala National Park is during the early morning hours between 6:00 AM and 10:00 AM, when these magnificent cats are actively hunting and moving through their territories. The late afternoon period from 3:00 PM to 6:00 PM also offers excellent viewing opportunities as leopards prepare for their evening activities.

Our experienced safari guides, with years of intimate knowledge of Yala's terrain and leopard behavior, strategically navigate through nature's pathways to maximize your chances of encountering these elusive predators. They understand the seasonal patterns, territorial boundaries, and preferred hunting grounds of individual leopards, reading nature's subtle signs to guide you through the wild landscape.

## Prime Leopard Viewing Locations

Block 1 of Yala National Park has gained international recognition as one of the most reliable areas for leopard sightings. This particular block features a unique combination of rocky outcrops, dense forest cover, and open clearings that create ideal conditions for leopard habitation. The rocky terrain provides perfect vantage points for leopards to survey their surroundings, while the dense vegetation offers excellent cover for stalking prey.

### Seasonal Considerations

During the dry season, which typically spans from February to July, water sources become limited throughout the park. This natural constraint forces leopards to visit specific waterholes more frequently, creating predictable viewing opportunities. The reduced vegetation during this period also improves visibility, making it easier to spot leopards resting on tree branches or rocky surfaces.

The wet season, from August to January, brings lush vegetation that provides excellent camouflage for leopards. While sightings may require more patience during this period, the vibrant green landscapes create stunning photographic backdrops, and the increased prey activity can lead to exciting hunting observations.

## Identifying Leopard Signs

Successful leopard spotting often begins with recognizing the subtle signs these animals leave behind. Experienced guides and keen observers look for several key indicators:

### Track Identification

Fresh leopard tracks on sandy paths are one of the most reliable signs of recent leopard activity. Leopard paw prints are distinctive, typically measuring 7-9 cm in width, with four toe pads and a characteristic heel pad. Unlike other big cats, leopards often retract their claws when walking, leaving clean, rounded impressions.

### Territorial Markings

Scratch marks on tree trunks serve as territorial markers for leopards. These vertical scratches, often found at eye level or higher, help leopards communicate their presence to other individuals. Trees with multiple scratch marks, particularly those with smooth bark, are frequently used marking sites.

### Behavioral Indicators

Alarm calls from other animals provide crucial information about leopard presence. Monkeys, particularly langurs, emit distinctive warning calls when they detect a leopard. Spotted deer and sambar deer also produce alarm calls that can alert you to nearby predators. Learning to recognize these vocalizations significantly enhances your safari experience.

### Visual Cues

Movement in the undergrowth, even subtle shifts in vegetation, can indicate leopard presence. These cats are masters of stealth, often remaining motionless for extended periods before making their move. Patient observation and trained eyes can detect these minute movements that might otherwise go unnoticed.

## Photography Tips for Leopard Encounters

Capturing stunning photographs of leopards requires both technical preparation and understanding of animal behavior. Here are essential tips for wildlife photography in Yala:

### Equipment Recommendations

A telephoto lens with at least 200mm focal length is essential for capturing detailed leopard images. Professional wildlife photographers often use 400mm to 600mm lenses to achieve frame-filling shots while maintaining a safe distance. Image stabilization technology helps compensate for vehicle movement and hand shake.

### Camera Settings

Keep your camera ready at all times, as leopard encounters can be brief and unpredictable. Pre-set your camera to handle various lighting conditions:
- Aperture Priority mode (f/5.6 to f/8) for optimal depth of field
- ISO settings between 400-1600 depending on lighting
- Continuous autofocus mode to track moving subjects
- High-speed continuous shooting mode for action sequences

### Ethical Photography Practices

Always maintain respectful distance from the animals. Our guides ensure that vehicles maintain appropriate spacing to avoid causing stress to the leopards. Early morning light provides the best photographic conditions, offering soft, warm tones that enhance the natural beauty of these magnificent creatures.

## Conservation and Responsible Tourism

Yala National Park's leopard population represents a conservation success story, with stable numbers maintained through careful park management and responsible tourism practices. By choosing experienced safari operators like Nimal Safari, you contribute to conservation efforts through park fees and support for local communities.

The park's management implements strict regulations to protect both wildlife and visitors, including designated safari routes, time restrictions, and vehicle limits. These measures ensure that leopard viewing remains sustainable while protecting the natural behaviors of these incredible animals.

## Planning Your Leopard Safari Experience

To maximize your chances of successful leopard sightings, consider booking multiple safari sessions during your visit. Early morning and late afternoon safaris offer different opportunities, and combining both increases your overall chances of encounters. Our full-day safari packages provide comprehensive coverage of prime leopard territories with expert guidance throughout your adventure.

Remember that wildlife viewing requires patience and respect for nature's timing. While Yala offers exceptional leopard viewing opportunities, each safari is unique, and the experience of being in their natural habitat is valuable regardless of specific sightings.`,
      author: "Nimal Safari Team",
      date: "2024-01-15",
      image: "/Images/yala1.webp",
      category: "Wildlife",
      readTime: "15 min read",
    },
    {
      id: 2,
      title: "Safari Adventure: Elephant Encounters in Udawalawe's Natural Paradise",
      excerpt:
        "Experience the magic of an authentic safari adventure as you watch wild elephants roam freely in their natural habitat at Udawalawe. Immerse yourself in nature's grandeur at one of Sri Lanka's premier elephant viewing destinations, where every safari moment brings you closer to the wild heart of the island.",
      content: `Step into the wild heart of Sri Lanka with an unforgettable safari experience at Udawalawe National Park, where nature's gentle giants roam freely across pristine landscapes. This premier safari destination offers visitors an exceptional opportunity to observe these magnificent pachyderms in their natural habitat, surrounded by the untouched beauty of the island's wilderness. With a population exceeding 500 elephants, Udawalawe National Park provides one of the most reliable elephant viewing experiences in all of Asia, where every safari journey brings you face-to-face with nature's most majestic creatures.

## The Udawalawe Elephant Experience

The park's unique natural ecosystem, characterized by open grasslands, scrub forests, and the expansive Udawalawe Reservoir, creates ideal conditions for immersive elephant observation during your safari. Unlike denser forest environments where elephants can easily disappear into the vegetation, Udawalawe's more open terrain provides excellent visibility and extended viewing opportunities, allowing you to witness nature's grand spectacle unfold before your eyes.

### The Udawalawe Reservoir: A Wildlife Hotspot

The Udawalawe Reservoir serves as the heart of the park's ecosystem, attracting large herds of elephants throughout the year. During the dry season, which typically runs from May to September, water sources become concentrated, drawing elephants from across the park to this central location. This natural congregation creates spectacular viewing opportunities as multiple family groups gather to drink, bathe, and socialize.

The reservoir's edges provide perfect vantage points for observing elephant behavior, including:
- Social interactions between family members
- Playful behavior of young calves
- Dominance displays by mature bulls
- Bathing and mud-wallowing activities
- Drinking and water collection techniques

## Optimal Safari Times for Elephant Viewing

Our comprehensive full-day safari packages are designed to maximize your elephant viewing experience by covering different times of day, each offering unique behavioral observations:

### Morning Safaris (6:00 AM - 10:00 AM)

Morning safaris provide the best opportunity to observe elephants during their most active feeding periods. As the sun rises, elephant herds move from their overnight locations to prime feeding areas. This period offers excellent opportunities to witness:
- Family groups moving together in coordinated patterns
- Calves learning feeding techniques from adults
- Bulls patrolling territories and marking boundaries
- Natural foraging behaviors and food selection

### Afternoon Safaris (2:00 PM - 6:00 PM)

Afternoon safaris combine excellent wildlife viewing with optimal photographic conditions. The golden hour lighting creates stunning visual opportunities, while elephants remain active near water sources. This period is particularly rewarding for:
- Photography enthusiasts seeking dramatic lighting
- Observing elephants cooling off in water
- Witnessing social interactions and communication
- Experiencing the park's diverse birdlife

### Evening Safaris (4:00 PM - 7:00 PM)

Evening safaris offer a unique perspective as elephants prepare for the night. Family groups often gather in specific areas, creating intimate viewing opportunities. The cooler temperatures and softer light create a magical atmosphere for observing:
- Family bonding and protective behaviors
- Calves playing and learning from older siblings
- Herd formations and social hierarchies
- Natural behaviors as daylight fades

## Beyond Elephants: Udawalawe's Diverse Wildlife

While elephants are undoubtedly the star attraction, Udawalawe National Park supports a rich diversity of wildlife that enhances every safari experience:

### Mammalian Diversity

Water buffalo herds are commonly seen grazing alongside elephants, creating fascinating interspecies interactions. Spotted deer (axis deer) are abundant throughout the park, serving as important prey species and contributing to the ecosystem's balance. Sambar deer, though more elusive, can occasionally be spotted in forested areas.

### Reptilian Inhabitants

The park's water bodies support healthy populations of marsh crocodiles (Crocodylus palustris), which can often be observed basking on banks or floating in the reservoir. Monitor lizards, including the impressive water monitor, add to the park's reptilian diversity.

### Avian Abundance

Udawalawe is home to over 200 bird species, making it a paradise for birdwatchers. The reservoir attracts numerous water birds, including:
- Various species of herons and egrets
- Kingfishers in multiple varieties
- Storks and ibises
- Raptors including eagles and hawks
- Migratory waterfowl during seasonal periods

## Conservation and Research

Udawalawe National Park plays a crucial role in elephant conservation in Sri Lanka. The park's elephant population is carefully monitored, and research programs contribute valuable data to conservation efforts. The Udawalawe Elephant Transit Home, located adjacent to the park, provides rehabilitation for orphaned elephant calves, eventually reintroducing them to the wild.

## Planning Your Udawalawe Safari

To maximize your elephant viewing experience, we recommend:
- Booking multiple safari sessions to observe different behaviors
- Visiting during the dry season for concentrated viewing opportunities
- Choosing early morning or late afternoon slots for optimal activity
- Bringing binoculars for detailed observation
- Maintaining patience and allowing natural behaviors to unfold

The combination of reliable elephant sightings, diverse wildlife, and beautiful landscapes makes Udawalawe National Park an essential destination for any wildlife enthusiast visiting Sri Lanka.`,
      author: "Nimal Safari Team",
      date: "2024-01-10",
      image: "/Images/lunu3.webp",
      category: "Wildlife",
      readTime: "12 min read",
    },
    {
      id: 3,
      title: "Nature's Symphony: Birdwatching Safari in Bundala's Wetland Paradise",
      excerpt:
        "Discover the incredible bird diversity of Bundala on an immersive safari experience through this Ramsar wetland site. Witness nature's spectacular migration as birds from around the world gather in this pristine wilderness, creating a birdwatcher's paradise in the heart of Sri Lanka's natural landscape.",
      content: `Embark on a unique safari adventure through Bundala National Park, one of Sri Lanka's most significant wetland ecosystems and a Ramsar Wetland of International Importance. This pristine natural sanctuary highlights the critical role of untouched wilderness in supporting migratory bird populations and maintaining regional biodiversity. For birdwatchers and nature enthusiasts seeking an authentic safari experience, Bundala offers an unparalleled opportunity to observe both resident and migratory bird species thriving in their natural habitats, where the rhythms of nature unfold in spectacular displays of avian life.

## A Ramsar Wetland of Global Significance

The Ramsar Convention designation places Bundala among the world's most important wetlands, recognizing its value for waterfowl conservation, ecosystem services, and biodiversity maintenance. This international recognition reflects the park's importance as a critical stopover point for migratory birds traveling along the Central Asian Flyway.

## Diverse Habitats Supporting Rich Biodiversity

Bundala's unique landscape encompasses multiple distinct habitat types, each supporting specialized bird communities:

### Lagoons and Wetlands

The park's extensive lagoon system provides essential feeding and breeding grounds for numerous waterbird species. These shallow water bodies support rich aquatic ecosystems, attracting birds that feed on fish, crustaceans, and aquatic invertebrates. The lagoons' varying depths create microhabitats suitable for different bird species with varying feeding requirements.

### Salt Pans

The salt pan areas within Bundala create unique saline environments that attract specialized bird species adapted to high-salinity conditions. These areas provide important feeding grounds for waders and shorebirds, particularly during low-tide periods when exposed mudflats become accessible.

### Scrublands and Dry Forests

The park's terrestrial habitats support a diverse array of resident bird species, including several endemic to Sri Lanka. These areas provide nesting sites, roosting locations, and foraging opportunities for forest-dwelling birds, creating a complete ecosystem that supports year-round avian diversity.

### Coastal Sand Dunes

The coastal dune systems add another dimension to Bundala's habitat diversity, supporting specialized coastal bird species and providing important nesting sites for ground-nesting birds.

## Migratory Bird Spectacle

The best time for birdwatching in Bundala spans from September to March, coinciding with the arrival of migratory birds from northern breeding grounds. This period transforms the park into a bustling avian metropolis, with thousands of birds representing dozens of species.

### Greater Flamingos

Perhaps the most spectacular sight in Bundala is the presence of Greater Flamingos, which arrive in flocks numbering in the hundreds. These elegant pink birds create stunning visual displays as they feed in shallow waters, their synchronized movements creating patterns that captivate observers. The flamingos' presence indicates healthy wetland conditions and abundant food resources.

### Stork Species

Painted Storks, with their distinctive pink and white plumage, are regular visitors to Bundala. These large wading birds are often seen in groups, using their specialized bills to feed in shallow waters. The park also hosts other stork species, including the impressive Black-necked Stork and the smaller Asian Openbill.

### Pelican Populations

Both Great White Pelicans and Spot-billed Pelicans frequent Bundala's waters, their large size and distinctive feeding behaviors making them easy to observe. These birds often work cooperatively to herd fish, creating fascinating feeding spectacles.

### Waterfowl Diversity

The park's wetlands support numerous duck species, including Lesser Whistling Ducks, Cotton Pygmy Geese, and various teal species. Waders, including sandpipers, plovers, and curlews, add to the diversity, each species occupying specific niches within the wetland ecosystem.

## Optimal Birdwatching Times

Early morning and late afternoon provide the best birdwatching opportunities, as birds are most active during these periods. Morning sessions allow observation of birds leaving roosting sites and beginning their daily feeding activities, while evening sessions offer opportunities to witness birds returning to roosts and engaging in social behaviors.

## Beyond Birds: Bundala's Complete Ecosystem

While birds are the primary attraction, Bundala supports a complete ecosystem with diverse wildlife:

### Saltwater Crocodiles

The park's water bodies are home to healthy populations of saltwater crocodiles, the largest living reptiles. These impressive predators can often be observed basking on banks or floating in lagoons, adding an element of excitement to any safari.

### Elephants

Small herds of elephants occasionally visit Bundala, particularly during dry periods when they seek water sources. These visits create unique opportunities to observe elephants in a coastal wetland setting, a combination rarely seen elsewhere.

### Reptilian Diversity

The park supports numerous reptile species, including various snakes, lizards, and turtles. The Star Tortoise, an endangered species, finds refuge in Bundala's protected habitats.

## Conservation Importance

Bundala's designation as a Ramsar site reflects its critical importance for regional and global bird conservation. The park serves as a vital link in the migratory bird network, supporting species that travel thousands of kilometers between breeding and wintering grounds. Conservation efforts focus on maintaining water quality, protecting habitat integrity, and minimizing human disturbance to ensure the park continues to fulfill its ecological functions.

## Photography Opportunities

Bundala's combination of abundant birdlife, diverse habitats, and excellent lighting conditions creates exceptional opportunities for wildlife photography. The park's open landscapes allow for extended observation periods, while the variety of species ensures that every visit offers new photographic subjects.

## Planning Your Bundala Birdwatching Experience

To maximize your birdwatching experience:
- Visit during the migratory season (September-March) for maximum diversity
- Book early morning or late afternoon safaris for optimal activity
- Bring quality binoculars and telephoto lenses for detailed observation
- Work with experienced guides who can identify species and explain behaviors
- Practice patience and quiet observation to avoid disturbing birds

The combination of international conservation significance, exceptional bird diversity, and unique coastal wetland ecosystems makes Bundala National Park an essential destination for birdwatchers and nature enthusiasts visiting Sri Lanka.`,
      author: "Nimal Safari Team",
      date: "2024-01-05",
      image: "/Images/bu1.webp",
      category: "Birdwatching",
      readTime: "14 min read",
    },
    {
      id: 5,
      title: "Safari Seasons: Best Times to Experience Sri Lanka's Natural Wonders",
      excerpt:
        "Plan your perfect safari adventure with our comprehensive guide to the best seasons for experiencing nature's spectacle in each of Sri Lanka's national parks. Discover when wildlife is most active and nature's beauty reaches its peak.",
      content: `Timing your safari visit to Sri Lanka's national parks is crucial for maximizing your connection with nature and wildlife. Each season brings distinct advantages, wildlife behaviors, and viewing opportunities that showcase the ever-changing beauty of the natural world. Understanding seasonal patterns helps you plan the perfect safari adventure tailored to your interests, whether you're seeking intimate wildlife encounters, optimal photography conditions, or unique seasonal experiences that reveal nature's diverse character throughout the year.

## Understanding Sri Lanka's Climate Patterns

Sri Lanka experiences two monsoon seasons that create distinct regional weather patterns:
- **Southwest Monsoon (Yala)**: May to September, affecting the southwest and central regions
- **Northeast Monsoon (Maha)**: December to February, affecting the northeast regions

These monsoons create inter-monsoon periods with transitional weather, offering balanced conditions for wildlife viewing.

## Dry Season: Peak Wildlife Viewing (February - July)

The dry season represents the optimal period for wildlife viewing across most of Sri Lanka's national parks. This extended period offers consistently excellent conditions for safari experiences.

### Wildlife Advantages

During the dry season, water sources become limited and concentrated, creating natural gathering points for wildlife. This concentration dramatically increases your chances of observing:
- **Large herbivore herds** gathering at waterholes
- **Predators** positioning themselves near water sources
- **Social interactions** as animals congregate in specific areas
- **Predator-prey dynamics** as hunting opportunities increase

### Visibility and Photography

Clear skies and reduced vegetation during the dry season provide:
- Excellent visibility across open landscapes
- Unobstructed views of wildlife
- Better lighting conditions for photography
- Reduced humidity for comfortable safari experiences

### Park-Specific Recommendations

**Yala National Park**: The dry season (February-July) offers the best leopard viewing opportunities. Reduced vegetation and concentrated water sources make leopards more predictable and visible. Block 1 becomes particularly active during this period.

**Udawalawe National Park**: Dry season conditions (May-September) concentrate elephants around the reservoir, creating spectacular viewing opportunities. The open grasslands provide excellent visibility for observing large herds.

**Bundala National Park**: While bird diversity remains high year-round, the dry season (February-July) provides better access to wetland areas and improved viewing conditions for waterbirds.

**Lunugamwehera National Park**: The dry season offers optimal conditions for elephant viewing, with animals gathering at remaining water sources throughout the park.

## Monsoon Seasons: Unique Opportunities

### Southwest Monsoon (May - September)

The southwest monsoon affects parks in the southern and western regions, bringing:
- **Lush green landscapes** that create stunning photographic backdrops
- **Reduced visitor numbers** offering more intimate safari experiences
- **Active birdlife** as resident species breed and raise young
- **Cooler temperatures** for comfortable safari experiences

**Considerations**: Some areas may experience temporary access restrictions during heavy rainfall. However, breaks in the weather often provide excellent viewing opportunities with dramatic skies and vibrant vegetation.

### Northeast Monsoon (December - February)

The northeast monsoon primarily affects the northern and eastern regions, while southern parks experience:
- **Dry conditions** in Yala and Udawalawe
- **Excellent wildlife viewing** as animals seek water sources
- **Clear skies** and comfortable temperatures
- **Peak tourist season** with higher visitor numbers

## Inter-Monsoon Periods: Balanced Conditions

### First Inter-Monsoon (March - April)

This transitional period offers:
- **Balanced weather conditions** with moderate rainfall
- **Active wildlife** as animals adapt to changing conditions
- **Comfortable temperatures** before the heat of peak dry season
- **Good visibility** with emerging new growth

### Second Inter-Monsoon (October - November)

The second inter-monsoon period provides:
- **Transitional weather** between monsoon seasons
- **Excellent birdwatching** as migratory birds arrive
- **Lush vegetation** from previous monsoon rains
- **Moderate visitor numbers** between peak seasons

## Seasonal Wildlife Behaviors

### Breeding Seasons

Understanding breeding seasons enhances your safari experience:
- **Elephant breeding**: Year-round, with peaks during inter-monsoon periods
- **Bird breeding**: Varies by species, with many breeding during monsoon periods
- **Leopard activity**: More visible during dry season when prey is concentrated

### Migration Patterns

Migratory bird arrivals create seasonal highlights:
- **September-March**: Peak migratory bird season in Bundala and coastal wetlands
- **December-February**: Additional migratory species arrive from northern regions
- **March-April**: Departure of winter migrants, arrival of summer migrants

## Month-by-Month Guide

### January
- Dry conditions in most parks
- Excellent wildlife viewing
- Clear skies and good visibility
- Moderate temperatures

### February
- Beginning of peak dry season
- Optimal conditions for leopard viewing in Yala
- Concentrated wildlife at water sources
- Excellent photography conditions

### March-April
- Peak dry season conditions
- Best overall wildlife viewing period
- Hot temperatures during midday
- Early morning and late afternoon safaris recommended

### May
- Transition to southwest monsoon begins
- Still excellent viewing in most parks
- Increasing vegetation
- Good bird activity

### June-August
- Southwest monsoon active
- Lush green landscapes
- Fewer crowds
- Good for birdwatching and photography

### September
- End of southwest monsoon
- Beginning of migratory bird season
- Improving wildlife viewing conditions
- Balanced weather

### October-November
- Second inter-monsoon period
- Excellent conditions across all parks
- Peak migratory bird diversity
- Comfortable temperatures

### December
- Beginning of northeast monsoon
- Dry conditions in southern parks
- Peak tourist season begins
- Excellent wildlife viewing

## Planning Your Visit

### For Leopard Viewing
**Best Period**: February to July
**Recommended Parks**: Yala National Park Block 1
**Optimal Times**: Early morning (6-10 AM) and late afternoon (3-6 PM)

### For Elephant Viewing
**Best Period**: Year-round, with peaks during dry season
**Recommended Parks**: Udawalawe, Lunugamwehera
**Optimal Times**: Early morning and late afternoon

### For Birdwatching
**Best Period**: September to March for migratory species
**Recommended Parks**: Bundala, all parks for resident species
**Optimal Times**: Early morning for maximum activity

### For Photography
**Best Period**: Dry season for wildlife, monsoon for landscapes
**Recommended**: Multiple visits to experience different conditions
**Optimal Times**: Golden hour periods (dawn and dusk)

## Weather Considerations

### Temperature Patterns
- **Cool Season** (December-February): 22-28°C, comfortable for extended safaris
- **Hot Season** (March-May): 28-32°C, early morning and evening safaris recommended
- **Monsoon Season**: 24-28°C, cooler with occasional rain

### Rainfall Patterns
- **Dry Season**: Minimal rainfall, clear skies
- **Monsoon Season**: Heavy but often brief showers, usually in afternoons
- **Inter-Monsoon**: Moderate, scattered showers

## Making the Most of Each Season

Regardless of when you visit, each season offers unique advantages:
- **Dry season**: Maximum wildlife concentration and visibility
- **Monsoon season**: Lush landscapes and intimate experiences
- **Inter-monsoon**: Balanced conditions and diverse opportunities

Work with experienced safari operators who understand seasonal patterns and can guide you to optimal viewing opportunities regardless of the time of year. The key is matching your interests—whether wildlife viewing, photography, or birdwatching—with the season that best supports those activities.`,
      author: "Nimal Safari Team",
      date: "2023-12-20",
      image: "/Images/popular1.webp",
      category: "Travel Tips",
      readTime: "16 min read",
    },
    {
      id: 6,
      title: "Safari Secret: Lunugamwehera's Untamed Natural Paradise",
      excerpt:
        "Discover Lunugamwehera National Park on an exclusive safari adventure, a peaceful natural sanctuary offering excellent elephant viewing, diverse wildlife, and authentic wilderness experiences away from the crowds. Experience the untouched beauty of Sri Lanka's hidden safari gem.",
      content: `Lunugamwehera National Park represents one of Sri Lanka's best-kept safari secrets, offering visitors an authentic wilderness experience away from the crowds. Located adjacent to the more famous Yala National Park, Lunugamwehera provides similar wildlife viewing opportunities with a more intimate, peaceful atmosphere.

## A Peaceful Alternative to Yala

While Yala attracts thousands of visitors annually, Lunugamwehera offers a quieter alternative with comparable wildlife diversity. The park's lower visitor numbers create a more relaxed safari experience, allowing for extended wildlife observation without the pressure of crowded viewing areas.

## Elephant Viewing Excellence

Lunugamwehera is particularly renowned for its reliable elephant viewing opportunities. The park supports healthy elephant populations that are often more approachable than in busier parks, providing excellent opportunities for:
- Observing natural elephant behaviors
- Photography without crowds
- Extended viewing sessions
- Family group interactions

## Diverse Wildlife Habitats

The park encompasses varied ecosystems including:
- Dry mixed evergreen forests
- Scrublands and grasslands
- Water bodies and reservoirs
- Rocky outcrops

This habitat diversity supports a wide range of wildlife species beyond elephants, including spotted deer, wild boar, peacocks, and various bird species.

## Best Times to Visit

Lunugamwehera offers excellent viewing year-round, with the dry season (May-September) providing the most concentrated wildlife viewing as animals gather around water sources. The park's accessibility and peaceful atmosphere make it an ideal choice for first-time safari visitors or those seeking a more relaxed experience.`,
      author: "Nimal Safari Team",
      date: "2023-12-15",
      image: "/Images/lunu1.webp",
      category: "Wildlife",
      readTime: "8 min read",
    },
    {
      id: 7,
      title: "Safari Essentials: What to Pack for Your Nature Adventure",
      excerpt:
        "Prepare for your ultimate safari adventure in Sri Lanka's wilderness with our essential packing guide. Discover everything you need for comfort, safety, and capturing nature's most spectacular moments during your wildlife safari experience.",
      content: `Proper preparation is essential for maximizing your safari experience in Sri Lanka's national parks. This comprehensive packing guide ensures you have everything needed for comfort, safety, and optimal wildlife viewing.

## Clothing Essentials

### Neutral Colors
Wear neutral, earth-tone colors (beige, khaki, olive, brown) that blend with natural surroundings. Avoid bright colors, white, and black, which can startle wildlife or make you stand out.

### Layering System
Sri Lanka's climate can vary throughout the day:
- **Base layer**: Lightweight, moisture-wicking fabric
- **Mid layer**: Long-sleeved shirt for sun protection
- **Outer layer**: Light jacket for early morning chill

### Protection from Elements
- Wide-brimmed hat for sun protection
- Lightweight rain jacket (monsoon season)
- Comfortable, closed-toe shoes
- Long pants to protect from insects and vegetation

## Photography Equipment

Essential gear for capturing wildlife:
- Camera body with weather sealing
- Telephoto lens (200mm minimum, 400-600mm ideal)
- Extra batteries and memory cards
- Lens cleaning kit
- Camera bag with padding
- Tripod or monopod for stability

## Comfort and Safety Items

- Sunscreen (high SPF, reef-safe)
- Insect repellent
- Binoculars for detailed observation
- Reusable water bottle
- Snacks for extended safaris
- First aid kit basics
- Personal medications

## Documentation

- Valid park permits
- Identification documents
- Travel insurance information
- Emergency contact details
- Camera permits if required

Proper preparation ensures you're ready to fully enjoy your safari adventure while staying comfortable and safe throughout your wildlife viewing experience.`,
      author: "Nimal Safari Team",
      date: "2023-12-10",
      image: "/Images/popular2.webp",
      category: "Travel Tips",
      readTime: "6 min read",
    },
    {
      id: 8,
      title: "Safari Wildlife Guide: Understanding Nature's Inhabitants",
      excerpt:
        "Learn about the diverse wildlife you'll encounter during your Sri Lankan safari adventure, including identification tips, behavioral insights, and the natural behaviors of key species thriving in their wild habitats.",
      content: `Sri Lanka's national parks support an incredible diversity of wildlife, from large mammals to colorful birds and fascinating reptiles. Understanding the animals you'll encounter enhances your safari experience and appreciation for these remarkable ecosystems.

## Large Mammals

### Asian Elephants
The largest land mammals in Sri Lanka, elephants are often the highlight of safari experiences. Learn to identify:
- Family groups led by matriarchs
- Solitary bulls during musth periods
- Calves learning from adults
- Social behaviors and communication

### Leopards
Sri Lanka's apex predator, leopards are masters of stealth. Understanding their behavior helps with sightings:
- Territorial marking behaviors
- Hunting strategies
- Tree-climbing abilities
- Nocturnal and crepuscular activity patterns

### Sloth Bears
These unique bears are primarily nocturnal but can be spotted during early morning hours. They're known for:
- Long claws for digging
- Sloth-like appearance
- Honey and termite feeding
- Shy, elusive nature

## Herbivores

### Spotted Deer (Axis Deer)
Abundant throughout parks, these deer are:
- Primary prey for leopards
- Active during dawn and dusk
- Form large herds
- Important ecosystem indicators

### Sambar Deer
Larger than spotted deer, sambar are:
- More elusive and forest-dwelling
- Important prey species
- Excellent swimmers
- Solitary or small group animals

### Water Buffalo
Domestic and wild buffalo are common:
- Often seen near water sources
- Important for ecosystem maintenance
- Form large herds
- Graze alongside elephants

## Birds

Sri Lanka hosts over 400 bird species, including:
- Endemic species found nowhere else
- Migratory birds from northern regions
- Colorful kingfishers and bee-eaters
- Impressive raptors and eagles

## Reptiles

### Crocodiles
Both marsh and saltwater crocodiles inhabit park waters:
- Important apex predators
- Often seen basking on banks
- Critical for ecosystem balance
- Impressive size and power

### Monitor Lizards
Large lizards including water monitors:
- Impressive size and appearance
- Excellent swimmers
- Important scavengers
- Fascinating to observe

Understanding these animals' roles in their ecosystems deepens appreciation for the complex relationships that maintain healthy wildlife populations in Sri Lanka's national parks.`,
      author: "Nimal Safari Team",
      date: "2023-12-05",
      image: "/Images/gallery2.webp",
      category: "Wildlife",
      readTime: "9 min read",
    },
    {
      id: 9,
      title: "Safari Safety: Respecting Nature While Exploring the Wild",
      excerpt:
        "Essential safety guidelines and responsible safari practices for enjoying nature's wonders while protecting wildlife and ensuring your safety during national park visits. Learn how to experience the wild respectfully.",
      content: `Responsible safari practices ensure both your safety and the well-being of wildlife. Following proper guidelines creates positive experiences while contributing to conservation efforts.

## Vehicle Safety

### Staying in Vehicles
- Always remain inside your safari vehicle
- Keep windows closed when near dangerous animals
- Follow guide instructions immediately
- Never exit vehicles in park areas

### Distance Guidelines
- Maintain appropriate distance from wildlife
- Allow animals to move freely
- Never block animal movement paths
- Respect animal personal space

## Wildlife Interaction Rules

### Do's
- Stay quiet and minimize movement
- Use binoculars for closer observation
- Follow park regulations strictly
- Respect guide expertise and instructions

### Don'ts
- Never feed wildlife
- Avoid loud noises or sudden movements
- Don't attempt to attract animal attention
- Never chase or harass animals

## Environmental Responsibility

### Leave No Trace
- Take all trash with you
- Don't remove natural materials
- Stay on designated paths
- Minimize environmental impact

### Conservation Support
- Pay park fees that support conservation
- Choose responsible tour operators
- Support local communities
- Spread conservation awareness

## Emergency Preparedness

### Health Considerations
- Bring necessary medications
- Stay hydrated throughout safaris
- Protect against sun exposure
- Be aware of insect-borne diseases

### Communication
- Inform guides of health conditions
- Know emergency procedures
- Carry emergency contact information
- Understand park evacuation procedures

Following these guidelines ensures safe, enjoyable safaris while protecting the incredible wildlife that makes Sri Lanka's national parks so special.`,
      author: "Nimal Safari Team",
      date: "2023-11-28",
      image: "/Images/popular3.webp",
      category: "Travel Tips",
      readTime: "7 min read",
    },
    {
      id: 10,
      title: "Safari Routes: Navigating Nature's Best Wildlife Encounters",
      excerpt:
        "Expert insights into the best safari routes within Sri Lanka's national parks, including timing strategies and route selection for optimal wildlife viewing. Discover nature's hidden pathways for unforgettable safari experiences.",
      content: `Strategic route planning significantly enhances your safari experience. Understanding park layouts, animal movement patterns, and optimal timing helps maximize wildlife encounters during your visit.

## Yala National Park Routes

### Block 1 - Leopard Territory
Block 1 offers the highest leopard density:
- Start early (6 AM) for best chances
- Focus on rocky outcrops and waterholes
- Follow guide recommendations for current hotspots
- Allow time for patient observation

### Waterhole Circuits
During dry season, waterholes become activity centers:
- Visit multiple waterholes throughout the day
- Arrive early to secure good viewing positions
- Observe from appropriate distances
- Be patient for animal arrivals

## Udawalawe Routes

### Reservoir Circuit
The reservoir area provides excellent elephant viewing:
- Morning circuits for active feeding
- Afternoon visits for bathing behaviors
- Evening sessions for family gatherings
- Multiple visits for comprehensive experience

### Grassland Routes
Open grasslands offer different perspectives:
- Better visibility for distant herds
- Opportunities for landscape photography
- Birdwatching in open areas
- Understanding ecosystem relationships

## Timing Strategies

### Early Morning Routes
- Maximum animal activity
- Best lighting for photography
- Cooler temperatures
- Fewer other vehicles initially

### Afternoon Routes
- Second activity peak
- Golden hour photography
- Water source gatherings
- Extended viewing opportunities

### Full Day Strategies
- Combine multiple routes
- Cover different habitat types
- Maximize species diversity
- Experience behavioral changes

## Route Flexibility

Successful safaris require flexibility:
- Adapt to current conditions
- Follow guide recommendations
- Respond to wildlife movements
- Adjust based on weather

Working with experienced guides who understand current animal locations and movement patterns ensures you're positioned for the best possible wildlife viewing experiences throughout your safari adventure.`,
      author: "Nimal Safari Team",
      date: "2023-11-20",
      image: "/Images/yala2.webp",
      category: "Travel Tips",
      readTime: "8 min read",
    },
  ];

// Component that uses search params - needs to be wrapped in Suspense
const BlogContent = () => {
  const searchParams = useSearchParams();

  // Get initial post from query parameter or default to first post
  const getInitialPost = () => {
    const postId = searchParams.get('post');
    if (postId) {
      const post = blogPosts.find(p => p.id === parseInt(postId));
      if (post) return post;
    }
    return blogPosts[0];
  };

  const [selectedPost, setSelectedPost] = useState<BlogPost>(getInitialPost());

  // Update selected post when query parameter changes
  useEffect(() => {
    const postId = searchParams.get('post');
    if (postId) {
      const post = blogPosts.find(p => p.id === parseInt(postId));
      if (post) {
        setSelectedPost(post);
      }
    }
  }, [searchParams]);

  return <BlogClientContent selectedPost={selectedPost} setSelectedPost={setSelectedPost} />;
};

// Main blog content component (doesn't use search params)
const BlogClientContent = ({ selectedPost, setSelectedPost }: { selectedPost: BlogPost; setSelectedPost: (post: BlogPost) => void }) => {

  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLHRElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          end: "bottom 65%",
          toggleActions: "play none none reverse",
        },
      });

      headerTl
        .fromTo(
          lineRef.current,
          {
            width: 0,
            opacity: 0,
          },
          {
            width: "10%",
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          }
        )
        .fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );

      // Main content animation
      if (mainContentRef.current) {
        gsap.fromTo(
          mainContentRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mainContentRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Sidebar animation
      if (sidebarRef.current) {
        gsap.fromTo(
          sidebarRef.current,
          {
            opacity: 0,
            x: 30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sidebarRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [selectedPost]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderBlogContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let inList = false;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('## ')) {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc ml-6 mb-4 space-y-2">
              {currentList.map((item, i) => (
                <li key={i} className="ml-2">{item}</li>
              ))}
            </ul>
          );
          currentList = [];
          inList = false;
        }
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-bold text-primary mt-8 mb-4">
            {trimmedLine.substring(3)}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc ml-6 mb-4 space-y-2">
              {currentList.map((item, i) => (
                <li key={i} className="ml-2">{item}</li>
              ))}
            </ul>
          );
          currentList = [];
          inList = false;
        }
        elements.push(
          <h3 key={`h3-${index}`} className="text-xl font-semibold text-primary mt-6 mb-3">
            {trimmedLine.substring(4)}
          </h3>
        );
      } else if (trimmedLine.startsWith('- ')) {
        inList = true;
        currentList.push(trimmedLine.substring(2));
      } else if (trimmedLine === '') {
        if (inList && currentList.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc ml-6 mb-4 space-y-2">
              {currentList.map((item, i) => (
                <li key={i} className="ml-2">{item}</li>
              ))}
            </ul>
          );
          currentList = [];
          inList = false;
        }
        elements.push(<br key={`br-${index}`} />);
      } else if (trimmedLine !== '') {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc ml-6 mb-4 space-y-2">
              {currentList.map((item, i) => (
                <li key={i} className="ml-2">{item}</li>
              ))}
            </ul>
          );
          currentList = [];
          inList = false;
        }
        elements.push(
          <p key={`p-${index}`} className="mb-4 leading-relaxed">
            {trimmedLine}
          </p>
        );
      }
    });

    // Handle any remaining list items
    if (inList && currentList.length > 0) {
      elements.push(
        <ul key="list-final" className="list-disc ml-6 mb-4 space-y-2">
          {currentList.map((item, i) => (
            <li key={i} className="ml-2">{item}</li>
          ))}
        </ul>
      );
    }

    return <>{elements}</>;
  };

  return (
    <>
      <Nav textcolor="text-black" />
      <div
        ref={containerRef}
        className="w-full px-2 sm:px-4 md:px-6 lg:px-12 xl:px-16 pt-24 pb-16 bg-background font-display"
      >
        {/* Header */}
        <div ref={headerRef} className="flex items-center gap-4 mb-12">
          <hr
            ref={lineRef}
            className="w-16 sm:w-20 md:w-24 bg-secondary border-primary h-0.5"
          />
          <h2
            ref={titleRef}
            className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl uppercase text-primary"
          >
            Safari Blog
          </h2>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Side - Main Blog Content */}
          <div
            ref={mainContentRef}
            className="flex-1 lg:w-2/3 space-y-6"
          >
            {/* Featured Blog Post */}
            <article className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Image */}
              <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 800px"
                  priority
                />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Category and Date */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <span className="px-3 py-1 bg-accent text-muted rounded-full font-semibold">
                    {selectedPost.category}
                  </span>
                  <span>{formatDate(selectedPost.date)}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">
                  {selectedPost.title}
                </h1>

                {/* Author */}
                <div className="mb-6 text-gray-600">
                  <span className="font-semibold">By {selectedPost.author}</span>
                </div>

                {/* Content */}
                <article className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg font-medium">
                    {selectedPost.excerpt}
                  </p>
                  <div className="text-gray-700 leading-relaxed">
                    {renderBlogContent(selectedPost.content)}
                  </div>
                </article>
              </div>
            </article>
          </div>

          {/* Right Side - Recent Blog List */}
          <aside
            ref={sidebarRef}
            className="lg:w-1/3 space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-primary mb-6 pb-3 border-b-2 border-accent">
                Recent Posts
              </h3>
              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className={`w-full rounded-lg transition-all duration-300 ${
                      selectedPost.id === post.id
                        ? "ring-2 ring-accent bg-accent/10"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="w-full text-left group p-3"
                    >
                      <div className="flex gap-4">
                        {/* Thumbnail */}
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="100px"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm sm:text-base font-semibold mb-2 line-clamp-2 transition-colors ${
                            selectedPost.id === post.id
                              ? "text-accent"
                              : "text-primary group-hover:text-accent"
                          }`}>
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{formatDate(post.date)}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

// Export BlogContent for use with Suspense
export { BlogContent };

