export type HtmlTopicLevel = 'beg' | 'int' | 'adv'

export type HtmlTopic = {
  t: string
  l: HtmlTopicLevel
}

export type HtmlModule = {
  id: string
  tag: string
  tagColor: string
  title: string
  source: string[]
  dep: string | null
  topics: HtmlTopic[]
}

export type HtmlPhase = {
  id: string
  label: string
  title: string
  meta: string
  color: string
  why: string
  modules: HtmlModule[]
}

export const systemDesignSource: HtmlPhase[] = [
  {
    "id": "p0",
    "label": "Phase 0",
    "title": "Computing foundations",
    "meta": "~1 week · Do not skip, do not linger",
    "color": "#639922",
    "why": "Everything in system design is built on top of these. You don't need to master them — you need them clean enough that they never trip you up under interview pressure. One fast audit, patch the gaps.",
    "modules": [
      {
        "id": "p0-how-data-moves-across-a-network",
        "tag": "Networking",
        "tagColor": "#378ADD",
        "title": "How data moves across a network",
        "source": [
          "SD course §4"
        ],
        "dep": null,
        "topics": [
          {
            "t": "OSI model",
            "l": "beg"
          },
          {
            "t": "IP address",
            "l": "beg"
          },
          {
            "t": "TCP vs UDP",
            "l": "beg"
          },
          {
            "t": "HTTP / HTTPS",
            "l": "beg"
          },
          {
            "t": "DNS resolution chain",
            "l": "beg"
          },
          {
            "t": "Checksums",
            "l": "beg"
          },
          {
            "t": "Proxy vs reverse proxy",
            "l": "int"
          },
          {
            "t": "HTTP/2 & head-of-line blocking",
            "l": "int"
          }
        ]
      },
      {
        "id": "p0-processes-threads-memory-the-substrate",
        "tag": "OS Concepts",
        "tagColor": "#639922",
        "title": "Processes, threads, memory — the substrate",
        "source": [
          "Concurrency §2"
        ],
        "dep": null,
        "topics": [
          {
            "t": "Processes vs threads",
            "l": "beg"
          },
          {
            "t": "Thread lifecycle & states",
            "l": "beg"
          },
          {
            "t": "Concurrency vs parallelism",
            "l": "beg"
          },
          {
            "t": "Race conditions",
            "l": "beg"
          },
          {
            "t": "Context switching",
            "l": "beg"
          }
        ]
      },
      {
        "id": "p0-before-you-ever-choose-a-database",
        "tag": "DB Fundamentals",
        "tagColor": "#D85A30",
        "title": "Before you ever choose a database",
        "source": [
          "SD course §9 intro",
          "SDI §4"
        ],
        "dep": null,
        "topics": [
          {
            "t": "SQL vs NoSQL",
            "l": "beg"
          },
          {
            "t": "ACID transactions",
            "l": "int"
          },
          {
            "t": "Indexing basics",
            "l": "beg"
          },
          {
            "t": "Database types overview",
            "l": "beg"
          }
        ]
      }
    ]
  },
  {
    "id": "p1",
    "label": "Phase 1",
    "title": "LLD core — OOP, principles, patterns",
    "meta": "~2 weeks · The vocabulary of clean code",
    "color": "#7F77DD",
    "why": "LLD is the foundation of good HLD. You cannot design a robust distributed system if your class-level thinking is fuzzy. Learn patterns not as a list to memorise but as named solutions to recurring problems you already encounter.",
    "modules": [
      {
        "id": "p1-object-oriented-fundamentals",
        "tag": "OOP",
        "tagColor": "#7F77DD",
        "title": "Object-oriented fundamentals",
        "source": [
          "LLD §3"
        ],
        "dep": null,
        "topics": [
          {
            "t": "Classes & objects",
            "l": "beg"
          },
          {
            "t": "Encapsulation",
            "l": "beg"
          },
          {
            "t": "Abstraction",
            "l": "beg"
          },
          {
            "t": "Inheritance",
            "l": "beg"
          },
          {
            "t": "Polymorphism",
            "l": "beg"
          },
          {
            "t": "Interfaces",
            "l": "beg"
          },
          {
            "t": "Enums",
            "l": "beg"
          }
        ]
      },
      {
        "id": "p1-association-aggregation-composition",
        "tag": "Class Relationships",
        "tagColor": "#7F77DD",
        "title": "Association, aggregation, composition",
        "source": [
          "LLD §4"
        ],
        "dep": "OOP fundamentals",
        "topics": [
          {
            "t": "Association",
            "l": "beg"
          },
          {
            "t": "Aggregation",
            "l": "beg"
          },
          {
            "t": "Composition",
            "l": "beg"
          },
          {
            "t": "Dependency",
            "l": "int"
          },
          {
            "t": "Realization",
            "l": "int"
          }
        ]
      },
      {
        "id": "p1-dry-kiss-yagni-solid",
        "tag": "Design Principles",
        "tagColor": "#7F77DD",
        "title": "DRY, KISS, YAGNI + SOLID",
        "source": [
          "LLD §5",
          "LLD §6"
        ],
        "dep": "Class relationships",
        "topics": [
          {
            "t": "DRY",
            "l": "beg"
          },
          {
            "t": "KISS",
            "l": "beg"
          },
          {
            "t": "YAGNI",
            "l": "beg"
          },
          {
            "t": "Coupling & cohesion",
            "l": "int"
          },
          {
            "t": "Law of Demeter",
            "l": "int"
          },
          {
            "t": "Separation of concerns",
            "l": "int"
          },
          {
            "t": "SRP",
            "l": "int"
          },
          {
            "t": "OCP",
            "l": "int"
          },
          {
            "t": "LSP",
            "l": "int"
          },
          {
            "t": "ISP",
            "l": "int"
          },
          {
            "t": "DIP",
            "l": "int"
          }
        ]
      },
      {
        "id": "p1-expressing-designs-visually",
        "tag": "UML",
        "tagColor": "#888780",
        "title": "Expressing designs visually",
        "source": [
          "LLD §7"
        ],
        "dep": "OOP fundamentals",
        "topics": [
          {
            "t": "Class diagram",
            "l": "beg"
          },
          {
            "t": "Use case diagram",
            "l": "beg"
          },
          {
            "t": "Sequence diagram",
            "l": "int"
          },
          {
            "t": "Activity diagram",
            "l": "int"
          },
          {
            "t": "State machine diagram",
            "l": "int"
          }
        ]
      },
      {
        "id": "p1-how-objects-are-created",
        "tag": "Design Patterns — Creational",
        "tagColor": "#0F6E56",
        "title": "How objects are created",
        "source": [
          "LLD §8"
        ],
        "dep": "SOLID principles",
        "topics": [
          {
            "t": "Singleton",
            "l": "beg"
          },
          {
            "t": "Builder",
            "l": "beg"
          },
          {
            "t": "Factory method",
            "l": "beg"
          },
          {
            "t": "Abstract factory",
            "l": "int"
          },
          {
            "t": "Prototype",
            "l": "int"
          }
        ]
      },
      {
        "id": "p1-how-objects-are-composed",
        "tag": "Design Patterns — Structural",
        "tagColor": "#0F6E56",
        "title": "How objects are composed",
        "source": [
          "LLD §8"
        ],
        "dep": "Creational patterns",
        "topics": [
          {
            "t": "Adapter",
            "l": "beg"
          },
          {
            "t": "Facade",
            "l": "beg"
          },
          {
            "t": "Decorator",
            "l": "beg"
          },
          {
            "t": "Composite",
            "l": "int"
          },
          {
            "t": "Proxy",
            "l": "int"
          },
          {
            "t": "Bridge",
            "l": "adv"
          },
          {
            "t": "Flyweight",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p1-how-objects-communicate",
        "tag": "Design Patterns — Behavioral",
        "tagColor": "#0F6E56",
        "title": "How objects communicate",
        "source": [
          "LLD §8"
        ],
        "dep": "Structural patterns",
        "topics": [
          {
            "t": "Strategy",
            "l": "beg"
          },
          {
            "t": "Iterator",
            "l": "beg"
          },
          {
            "t": "Observer",
            "l": "int"
          },
          {
            "t": "Command",
            "l": "int"
          },
          {
            "t": "State",
            "l": "int"
          },
          {
            "t": "Template method",
            "l": "int"
          },
          {
            "t": "Chain of responsibility",
            "l": "int"
          },
          {
            "t": "Mediator",
            "l": "adv"
          },
          {
            "t": "Visitor",
            "l": "adv"
          },
          {
            "t": "Memento",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p1-patterns-you-ll-use-in-real-systems",
        "tag": "Additional Patterns",
        "tagColor": "#0F6E56",
        "title": "Patterns you'll use in real systems",
        "source": [
          "LLD §8"
        ],
        "dep": "Behavioral patterns",
        "topics": [
          {
            "t": "Repository pattern",
            "l": "int"
          },
          {
            "t": "Dependency injection",
            "l": "int"
          },
          {
            "t": "MVC pattern",
            "l": "int"
          },
          {
            "t": "Null object pattern",
            "l": "int"
          },
          {
            "t": "Thread pool pattern",
            "l": "adv"
          },
          {
            "t": "Producer-consumer pattern",
            "l": "adv"
          }
        ]
      }
    ]
  },
  {
    "id": "p2",
    "label": "Phase 2",
    "title": "Concurrency — making LLD thread-safe",
    "meta": "~1 week · Learn this before LLD problems",
    "color": "#D85A30",
    "why": "Every LLD interview problem that involves shared state — cache, rate limiter, booking system, pub-sub — requires you to think about thread safety. Concurrency is not a separate topic: it's a required lens on LLD. Learn it now, apply it immediately in Phase 3.",
    "modules": [
      {
        "id": "p2-the-building-blocks-of-safe-concurrent-code",
        "tag": "Sync Primitives",
        "tagColor": "#D85A30",
        "title": "The building blocks of safe concurrent code",
        "source": [
          "Concurrency §4"
        ],
        "dep": "OS concepts (Phase 0)",
        "topics": [
          {
            "t": "Mutex",
            "l": "beg"
          },
          {
            "t": "Semaphores",
            "l": "beg"
          },
          {
            "t": "Condition variables",
            "l": "int"
          },
          {
            "t": "Read-write locks",
            "l": "int"
          },
          {
            "t": "Barriers & latches",
            "l": "int"
          }
        ]
      },
      {
        "id": "p2-when-and-how-to-lock",
        "tag": "Locking Strategies",
        "tagColor": "#D85A30",
        "title": "When and how to lock",
        "source": [
          "Concurrency §5"
        ],
        "dep": "Sync primitives",
        "topics": [
          {
            "t": "Coarse vs fine-grained locking",
            "l": "int"
          },
          {
            "t": "Reentrant locks",
            "l": "int"
          },
          {
            "t": "Optimistic vs pessimistic locking",
            "l": "int"
          },
          {
            "t": "Try-lock & timed locking",
            "l": "int"
          },
          {
            "t": "Two-phase locking",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p2-what-goes-wrong-and-why",
        "tag": "Concurrency Challenges",
        "tagColor": "#854F0B",
        "title": "What goes wrong and why",
        "source": [
          "Concurrency §7"
        ],
        "dep": "Locking strategies",
        "topics": [
          {
            "t": "Deadlock",
            "l": "beg"
          },
          {
            "t": "Livelock",
            "l": "beg"
          },
          {
            "t": "Starvation",
            "l": "int"
          },
          {
            "t": "Lost signal / wakeup",
            "l": "int"
          },
          {
            "t": "Thread leakage",
            "l": "int"
          },
          {
            "t": "Priority inversion",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p2-reusable-concurrent-designs",
        "tag": "Concurrency Patterns",
        "tagColor": "#854F0B",
        "title": "Reusable concurrent designs",
        "source": [
          "Concurrency §8"
        ],
        "dep": "Concurrency challenges",
        "topics": [
          {
            "t": "Thread pool pattern",
            "l": "beg"
          },
          {
            "t": "Producer-consumer",
            "l": "beg"
          },
          {
            "t": "Signaling pattern",
            "l": "beg"
          },
          {
            "t": "Reader-writer pattern",
            "l": "int"
          },
          {
            "t": "Future / promise pattern",
            "l": "int"
          },
          {
            "t": "Fork-join",
            "l": "adv"
          },
          {
            "t": "Double-checked locking",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p2-beyond-locks",
        "tag": "Lock-Free Programming",
        "tagColor": "#854F0B",
        "title": "Beyond locks",
        "source": [
          "Concurrency §6"
        ],
        "dep": "Concurrency patterns",
        "topics": [
          {
            "t": "Compare-and-swap (CAS)",
            "l": "int"
          },
          {
            "t": "Atomic operations",
            "l": "adv"
          }
        ]
      }
    ]
  },
  {
    "id": "p3",
    "label": "Phase 3",
    "title": "LLD problems — applying patterns + concurrency",
    "meta": "~2 weeks · Where theory becomes skill",
    "color": "#0F6E56",
    "why": "Problems are ordered by dependency: data structures first (they appear inside bigger systems), then state machines (required for ATM/vending/elevator), then management systems, then communication and financial systems. Each builds on patterns from Phase 1 and requires concurrency from Phase 2.",
    "modules": [
      {
        "id": "p3-implement-foundational-structures-first",
        "tag": "Data Structures & Search",
        "tagColor": "#0F6E56",
        "title": "Implement foundational structures first",
        "source": [
          "LLD §12",
          "Concurrency §11–12"
        ],
        "dep": "Concurrency (Phase 2) + Patterns (Phase 1)",
        "topics": [
          {
            "t": "LRU cache",
            "l": "beg"
          },
          {
            "t": "Thread-safe LRU cache",
            "l": "int"
          },
          {
            "t": "Bloom filter",
            "l": "beg"
          },
          {
            "t": "Concurrent bloom filter",
            "l": "int"
          },
          {
            "t": "Search autocomplete (Trie)",
            "l": "beg"
          },
          {
            "t": "Thread-safe Trie",
            "l": "adv"
          },
          {
            "t": "Concurrent HashMap",
            "l": "int"
          },
          {
            "t": "Thread-safe blocking queue",
            "l": "int"
          },
          {
            "t": "Lock-free queue",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p3-classic-synchronization-problems",
        "tag": "Concurrency Problems",
        "tagColor": "#D85A30",
        "title": "Classic synchronization problems",
        "source": [
          "Concurrency §10"
        ],
        "dep": "Sync primitives + Concurrency patterns",
        "topics": [
          {
            "t": "Print FooBar alternately",
            "l": "beg"
          },
          {
            "t": "Print zero even odd",
            "l": "beg"
          },
          {
            "t": "Bounded buffer",
            "l": "int"
          },
          {
            "t": "Readers-writers problem",
            "l": "int"
          },
          {
            "t": "Dining philosophers",
            "l": "int"
          },
          {
            "t": "Sleeping barber",
            "l": "int"
          },
          {
            "t": "Cigarette smokers",
            "l": "adv"
          },
          {
            "t": "Santa Claus problem",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p3-systems-driven-by-state-transitions",
        "tag": "State Machines",
        "tagColor": "#7F77DD",
        "title": "Systems driven by state transitions",
        "source": [
          "LLD §13"
        ],
        "dep": "State pattern (Phase 1) + Concurrency (Phase 2)",
        "topics": [
          {
            "t": "ATM design",
            "l": "int"
          },
          {
            "t": "Vending machine",
            "l": "int"
          },
          {
            "t": "Elevator system",
            "l": "int"
          },
          {
            "t": "Traffic control system",
            "l": "int"
          },
          {
            "t": "Coffee vending machine",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p3-crud-heavy-systems-with-relationships",
        "tag": "Management Systems",
        "tagColor": "#0F6E56",
        "title": "CRUD-heavy systems with relationships",
        "source": [
          "LLD §14"
        ],
        "dep": "OOP + Class relationships",
        "topics": [
          {
            "t": "Parking lot",
            "l": "beg"
          },
          {
            "t": "Task management system",
            "l": "beg"
          },
          {
            "t": "Inventory management",
            "l": "int"
          },
          {
            "t": "Library management",
            "l": "int"
          },
          {
            "t": "Restaurant management",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p3-infrastructure-level-lld",
        "tag": "Developer Tools",
        "tagColor": "#888780",
        "title": "Infrastructure-level LLD",
        "source": [
          "LLD §19"
        ],
        "dep": "Concurrency patterns + State pattern",
        "topics": [
          {
            "t": "URL shortener (LLD)",
            "l": "int"
          },
          {
            "t": "Logging framework",
            "l": "int"
          },
          {
            "t": "Rate limiter (LLD)",
            "l": "int"
          },
          {
            "t": "Thread-safe rate limiter",
            "l": "int"
          },
          {
            "t": "In-memory file system",
            "l": "adv"
          },
          {
            "t": "Version control system",
            "l": "adv"
          },
          {
            "t": "Task scheduler with dependencies",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p3-notification-pub-sub-chat",
        "tag": "Communication & Messaging",
        "tagColor": "#378ADD",
        "title": "Notification, pub-sub, chat",
        "source": [
          "LLD §16"
        ],
        "dep": "Observer pattern + Producer-consumer",
        "topics": [
          {
            "t": "Notification system",
            "l": "beg"
          },
          {
            "t": "Pub-sub system (LLD)",
            "l": "int"
          },
          {
            "t": "Multithreaded pub-sub",
            "l": "adv"
          },
          {
            "t": "Chat application",
            "l": "int"
          }
        ]
      },
      {
        "id": "p3-high-stakes-consistency-problems",
        "tag": "Financial & Booking",
        "tagColor": "#854F0B",
        "title": "High-stakes consistency problems",
        "source": [
          "LLD §17–18"
        ],
        "dep": "Optimistic/pessimistic locking + State machine",
        "topics": [
          {
            "t": "Splitwise",
            "l": "int"
          },
          {
            "t": "Payment gateway",
            "l": "int"
          },
          {
            "t": "Thread-safe ticket booking",
            "l": "int"
          },
          {
            "t": "Movie booking system",
            "l": "adv"
          },
          {
            "t": "Online stock exchange",
            "l": "adv"
          },
          {
            "t": "Online auction",
            "l": "adv"
          },
          {
            "t": "Ride hailing service (LLD)",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p3-graph-heavy-feed-systems",
        "tag": "Social & Content",
        "tagColor": "#7F77DD",
        "title": "Graph-heavy & feed systems",
        "source": [
          "LLD §15"
        ],
        "dep": "Graph relationships + Observer pattern",
        "topics": [
          {
            "t": "Social network",
            "l": "int"
          },
          {
            "t": "Stack Overflow",
            "l": "int"
          },
          {
            "t": "Learning platform",
            "l": "int"
          },
          {
            "t": "LinkedIn",
            "l": "adv"
          },
          {
            "t": "Spotify",
            "l": "adv"
          },
          {
            "t": "Cricinfo",
            "l": "adv"
          }
        ]
      }
    ]
  },
  {
    "id": "p4",
    "label": "Phase 4",
    "title": "HLD core concepts — scalability & data",
    "meta": "~2 weeks · Think in systems, not classes",
    "color": "#378ADD",
    "why": "Now that you know how to design inside a service (LLD), learn how to design between services (HLD). Start with the vocabulary — every concept here will appear in every HLD problem. The sequence matters: core concepts → caching → databases → database scaling.",
    "modules": [
      {
        "id": "p4-the-vocabulary-of-every-hld-conversation",
        "tag": "Core Concepts",
        "tagColor": "#378ADD",
        "title": "The vocabulary of every HLD conversation",
        "source": [
          "SD §2–3",
          "SDI §3"
        ],
        "dep": null,
        "topics": [
          {
            "t": "Scalability (vertical vs horizontal)",
            "l": "beg"
          },
          {
            "t": "Availability",
            "l": "beg"
          },
          {
            "t": "Reliability",
            "l": "beg"
          },
          {
            "t": "Latency vs throughput vs bandwidth",
            "l": "beg"
          },
          {
            "t": "Single point of failure",
            "l": "beg"
          },
          {
            "t": "CAP theorem",
            "l": "int"
          },
          {
            "t": "Consistency models",
            "l": "int"
          },
          {
            "t": "Strong vs eventual consistency",
            "l": "int"
          },
          {
            "t": "Consistent hashing",
            "l": "int"
          }
        ]
      },
      {
        "id": "p4-distributing-traffic",
        "tag": "Load Balancing",
        "tagColor": "#378ADD",
        "title": "Distributing traffic",
        "source": [
          "SD §5",
          "SDI §3"
        ],
        "dep": "Core concepts",
        "topics": [
          {
            "t": "Load balancer basics",
            "l": "beg"
          },
          {
            "t": "Load balancing algorithms",
            "l": "int"
          },
          {
            "t": "DNS load balancing",
            "l": "int"
          },
          {
            "t": "Anycast routing",
            "l": "adv"
          },
          {
            "t": "Nginx as load balancer",
            "l": "int"
          }
        ]
      },
      {
        "id": "p4-the-contract-between-services",
        "tag": "API Design",
        "tagColor": "#378ADD",
        "title": "The contract between services",
        "source": [
          "SD §6",
          "SDI §4"
        ],
        "dep": "Core concepts",
        "topics": [
          {
            "t": "REST API design",
            "l": "int"
          },
          {
            "t": "gRPC deep dive",
            "l": "int"
          },
          {
            "t": "GraphQL",
            "l": "int"
          },
          {
            "t": "Idempotency",
            "l": "int"
          },
          {
            "t": "API gateway pattern",
            "l": "int"
          },
          {
            "t": "Rate limiting (HLD)",
            "l": "int"
          },
          {
            "t": "Auth: session vs token",
            "l": "int"
          },
          {
            "t": "JWT",
            "l": "int"
          },
          {
            "t": "OAuth2 / SSO",
            "l": "int"
          }
        ]
      },
      {
        "id": "p4-sync-async-real-time",
        "tag": "Communication Patterns",
        "tagColor": "#378ADD",
        "title": "Sync, async, real-time",
        "source": [
          "SD §7",
          "SDI §5"
        ],
        "dep": "API design",
        "topics": [
          {
            "t": "Sync vs async communication",
            "l": "beg"
          },
          {
            "t": "Long polling",
            "l": "int"
          },
          {
            "t": "WebSockets",
            "l": "int"
          },
          {
            "t": "Server-sent events",
            "l": "int"
          },
          {
            "t": "Webhooks",
            "l": "int"
          },
          {
            "t": "Message queues (HLD)",
            "l": "int"
          },
          {
            "t": "Pub/sub (HLD)",
            "l": "int"
          },
          {
            "t": "Dead letter queues",
            "l": "int"
          },
          {
            "t": "Delivery semantics (at-least/at-most/exactly-once)",
            "l": "adv"
          },
          {
            "t": "Change data capture (CDC)",
            "l": "adv"
          },
          {
            "t": "WebRTC",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p4-the-single-biggest-performance-lever",
        "tag": "Caching",
        "tagColor": "#0F6E56",
        "title": "The single biggest performance lever",
        "source": [
          "SD §8",
          "SDI §4"
        ],
        "dep": "Core concepts",
        "topics": [
          {
            "t": "Cache-aside pattern",
            "l": "int"
          },
          {
            "t": "Read-through / write-through",
            "l": "int"
          },
          {
            "t": "Write-behind cache",
            "l": "int"
          },
          {
            "t": "Cache eviction policies",
            "l": "int"
          },
          {
            "t": "CDN",
            "l": "beg"
          },
          {
            "t": "Distributed cache architecture",
            "l": "int"
          },
          {
            "t": "Cache invalidation",
            "l": "adv"
          },
          {
            "t": "Cache stampede",
            "l": "adv"
          },
          {
            "t": "Cache warming",
            "l": "adv"
          },
          {
            "t": "Redis deep dive",
            "l": "int"
          },
          {
            "t": "Memcached",
            "l": "int"
          }
        ]
      },
      {
        "id": "p4-choosing-the-right-database",
        "tag": "Databases — Types",
        "tagColor": "#854F0B",
        "title": "Choosing the right database",
        "source": [
          "SD §9",
          "SDI §5"
        ],
        "dep": "Core concepts",
        "topics": [
          {
            "t": "Relational databases / PostgreSQL",
            "l": "beg"
          },
          {
            "t": "Document databases / MongoDB",
            "l": "beg"
          },
          {
            "t": "Key-value stores / DynamoDB",
            "l": "beg"
          },
          {
            "t": "Wide-column / Cassandra",
            "l": "int"
          },
          {
            "t": "Graph databases",
            "l": "int"
          },
          {
            "t": "Time series databases",
            "l": "int"
          },
          {
            "t": "Full-text search / Elasticsearch",
            "l": "int"
          },
          {
            "t": "Vector databases",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p4-why-databases-work-the-way-they-do",
        "tag": "Database Internals",
        "tagColor": "#854F0B",
        "title": "Why databases work the way they do",
        "source": [
          "SD §9 internals"
        ],
        "dep": "Database types",
        "topics": [
          {
            "t": "B-trees & B+ trees",
            "l": "adv"
          },
          {
            "t": "LSM trees",
            "l": "adv"
          },
          {
            "t": "Bloom filters (DB context)",
            "l": "int"
          },
          {
            "t": "How databases guarantee durability (WAL)",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p4-when-one-db-is-not-enough",
        "tag": "Database Scaling",
        "tagColor": "#854F0B",
        "title": "When one DB is not enough",
        "source": [
          "SD §10",
          "SDI §4"
        ],
        "dep": "Database internals",
        "topics": [
          {
            "t": "Indexing (deep)",
            "l": "beg"
          },
          {
            "t": "Query optimization",
            "l": "int"
          },
          {
            "t": "Read replicas",
            "l": "int"
          },
          {
            "t": "Denormalization",
            "l": "int"
          },
          {
            "t": "Materialized views",
            "l": "int"
          },
          {
            "t": "Connection pooling",
            "l": "int"
          },
          {
            "t": "Vertical partitioning",
            "l": "beg"
          },
          {
            "t": "Sharding",
            "l": "int"
          },
          {
            "t": "Sharding vs partitioning",
            "l": "int"
          },
          {
            "t": "MySQL deep dive",
            "l": "int"
          }
        ]
      },
      {
        "id": "p4-beyond-databases",
        "tag": "Storage Systems",
        "tagColor": "#888780",
        "title": "Beyond databases",
        "source": [
          "SD §11",
          "SDI §5"
        ],
        "dep": "Database scaling",
        "topics": [
          {
            "t": "Block vs file vs object storage",
            "l": "int"
          },
          {
            "t": "Object storage / S3",
            "l": "int"
          },
          {
            "t": "Distributed file systems",
            "l": "adv"
          },
          {
            "t": "Erasure coding",
            "l": "adv"
          }
        ]
      }
    ]
  },
  {
    "id": "p5",
    "label": "Phase 5",
    "title": "HLD architecture patterns + distributed systems",
    "meta": "~2 weeks · Senior-level thinking",
    "color": "#854F0B",
    "why": "Architectural patterns are the named solutions at the service level, the same way design patterns are named solutions at the class level. Distributed systems fundamentals is where 'senior' starts — this is the material that makes you reason from first principles instead of memorising designs.",
    "modules": [
      {
        "id": "p5-how-services-are-structured",
        "tag": "Architectural Patterns",
        "tagColor": "#854F0B",
        "title": "How services are structured",
        "source": [
          "SD §16"
        ],
        "dep": "HLD core concepts (Phase 4)",
        "topics": [
          {
            "t": "Client-server architecture",
            "l": "beg"
          },
          {
            "t": "Monolithic architecture",
            "l": "beg"
          },
          {
            "t": "Microservices architecture",
            "l": "int"
          },
          {
            "t": "Serverless architecture",
            "l": "int"
          },
          {
            "t": "Event-driven architecture",
            "l": "int"
          },
          {
            "t": "CQRS",
            "l": "adv"
          },
          {
            "t": "Event sourcing",
            "l": "adv"
          },
          {
            "t": "Peer-to-peer",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p5-operating-services-at-scale",
        "tag": "Microservices Patterns",
        "tagColor": "#854F0B",
        "title": "Operating services at scale",
        "source": [
          "SD §17",
          "SDI §6"
        ],
        "dep": "Architectural patterns",
        "topics": [
          {
            "t": "Service discovery",
            "l": "int"
          },
          {
            "t": "API gateway pattern",
            "l": "int"
          },
          {
            "t": "Backend for frontend (BFF)",
            "l": "int"
          },
          {
            "t": "Sidecar pattern",
            "l": "int"
          },
          {
            "t": "Circuit breaker pattern",
            "l": "int"
          },
          {
            "t": "Bulkhead pattern",
            "l": "int"
          },
          {
            "t": "Strangler fig pattern",
            "l": "int"
          },
          {
            "t": "Service mesh",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p5-the-decisions-that-define-your-design",
        "tag": "Trade-offs",
        "tagColor": "#888780",
        "title": "The decisions that define your design",
        "source": [
          "SD §12",
          "SDI §3"
        ],
        "dep": "Architectural patterns",
        "topics": [
          {
            "t": "Push vs pull architecture",
            "l": "beg"
          },
          {
            "t": "Stateful vs stateless",
            "l": "int"
          },
          {
            "t": "Long polling vs WebSockets",
            "l": "int"
          },
          {
            "t": "Fanout on write vs read",
            "l": "int"
          },
          {
            "t": "Batch vs stream processing",
            "l": "int"
          }
        ]
      },
      {
        "id": "p5-why-distributed-is-hard",
        "tag": "Distributed Systems Fundamentals",
        "tagColor": "#3C3489",
        "title": "Why distributed is hard",
        "source": [
          "SD §13",
          "SDI §4"
        ],
        "dep": "Microservices patterns",
        "topics": [
          {
            "t": "Challenges of distribution",
            "l": "int"
          },
          {
            "t": "Network partitions",
            "l": "int"
          },
          {
            "t": "Split brain problem",
            "l": "int"
          },
          {
            "t": "Heartbeats",
            "l": "int"
          },
          {
            "t": "Handling failures",
            "l": "adv"
          },
          {
            "t": "Clock synchronization problem",
            "l": "adv"
          },
          {
            "t": "Logical clocks",
            "l": "adv"
          },
          {
            "t": "Lamport timestamps",
            "l": "adv"
          },
          {
            "t": "Vector clocks",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p5-agreement-in-distributed-systems",
        "tag": "Consensus & Coordination",
        "tagColor": "#3C3489",
        "title": "Agreement in distributed systems",
        "source": [
          "SD §13",
          "SDI §6"
        ],
        "dep": "Distributed systems fundamentals",
        "topics": [
          {
            "t": "Consensus algorithms overview",
            "l": "adv"
          },
          {
            "t": "Paxos algorithm",
            "l": "adv"
          },
          {
            "t": "Raft algorithm",
            "l": "adv"
          },
          {
            "t": "Leader election",
            "l": "adv"
          },
          {
            "t": "Gossip protocol",
            "l": "adv"
          },
          {
            "t": "Zookeeper",
            "l": "adv"
          },
          {
            "t": "Docker & Kubernetes",
            "l": "int"
          }
        ]
      },
      {
        "id": "p5-atomicity-across-services",
        "tag": "Distributed Transactions",
        "tagColor": "#3C3489",
        "title": "Atomicity across services",
        "source": [
          "SD §14",
          "SDI §6"
        ],
        "dep": "Consensus & coordination",
        "topics": [
          {
            "t": "Problem with distributed transactions",
            "l": "adv"
          },
          {
            "t": "Two-phase commit (2PC)",
            "l": "adv"
          },
          {
            "t": "Three-phase commit (3PC)",
            "l": "adv"
          },
          {
            "t": "Saga pattern",
            "l": "adv"
          },
          {
            "t": "Outbox pattern",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p5-processing-data-at-scale",
        "tag": "Big Data & Streaming",
        "tagColor": "#3C3489",
        "title": "Processing data at scale",
        "source": [
          "SD §18",
          "SDI §5"
        ],
        "dep": "Communication patterns (Phase 4)",
        "topics": [
          {
            "t": "MapReduce",
            "l": "int"
          },
          {
            "t": "ETL pipelines",
            "l": "int"
          },
          {
            "t": "Data lakes",
            "l": "int"
          },
          {
            "t": "Data warehousing",
            "l": "int"
          },
          {
            "t": "Lambda architecture",
            "l": "adv"
          },
          {
            "t": "Kappa architecture",
            "l": "adv"
          },
          {
            "t": "Kafka deep dive",
            "l": "int"
          },
          {
            "t": "Flink / Spark",
            "l": "adv"
          },
          {
            "t": "SQS / RabbitMQ",
            "l": "int"
          }
        ]
      },
      {
        "id": "p5-specialized-structures-for-large-scale-systems",
        "tag": "Data Structures for Scale",
        "tagColor": "#3C3489",
        "title": "Specialized structures for large-scale systems",
        "source": [
          "SD §15",
          "SDI §3"
        ],
        "dep": "Database internals (Phase 4)",
        "topics": [
          {
            "t": "Geohash",
            "l": "int"
          },
          {
            "t": "Quad trees",
            "l": "adv"
          },
          {
            "t": "R-trees",
            "l": "adv"
          },
          {
            "t": "Skip lists",
            "l": "adv"
          },
          {
            "t": "Merkle trees",
            "l": "adv"
          },
          {
            "t": "HyperLogLog",
            "l": "adv"
          },
          {
            "t": "Count-min sketch",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p5-knowing-what-your-system-is-doing",
        "tag": "Observability",
        "tagColor": "#888780",
        "title": "Knowing what your system is doing",
        "source": [
          "SD §19"
        ],
        "dep": "Microservices patterns",
        "topics": [
          {
            "t": "Three pillars of observability",
            "l": "beg"
          },
          {
            "t": "Logging best practices",
            "l": "beg"
          },
          {
            "t": "Log aggregation",
            "l": "int"
          },
          {
            "t": "Correlation IDs",
            "l": "int"
          },
          {
            "t": "Metrics & instrumentation",
            "l": "int"
          },
          {
            "t": "Alert & monitoring",
            "l": "int"
          },
          {
            "t": "Distributed tracing",
            "l": "adv"
          },
          {
            "t": "Prometheus",
            "l": "int"
          }
        ]
      },
      {
        "id": "p5-security-at-the-system-level",
        "tag": "Security",
        "tagColor": "#888780",
        "title": "Security at the system level",
        "source": [
          "SD §20"
        ],
        "dep": "API design (Phase 4)",
        "topics": [
          {
            "t": "SSL/TLS deep dive",
            "l": "int"
          },
          {
            "t": "RBAC",
            "l": "int"
          },
          {
            "t": "Secrets management",
            "l": "int"
          },
          {
            "t": "SAML",
            "l": "adv"
          }
        ]
      }
    ]
  },
  {
    "id": "p6",
    "label": "Phase 6",
    "title": "Interview patterns — recurring solution templates",
    "meta": "~1 week · The reusable moves",
    "color": "#993556",
    "why": "Before doing full system design problems, learn the recurring patterns that appear across many problems. 'How do I handle high write traffic?' is the same question whether you're designing Twitter or a payment system. Master the patterns, then apply them in problems.",
    "modules": [
      {
        "id": "p6-standard-solutions-to-scale-problems",
        "tag": "Scaling Patterns",
        "tagColor": "#993556",
        "title": "Standard solutions to scale problems",
        "source": [
          "SDI §6"
        ],
        "dep": "HLD core + Distributed systems",
        "topics": [
          {
            "t": "High read traffic",
            "l": "int"
          },
          {
            "t": "High write traffic",
            "l": "int"
          },
          {
            "t": "Handling hot keys",
            "l": "int"
          },
          {
            "t": "Handling traffic spikes",
            "l": "int"
          },
          {
            "t": "Removing SPOFs",
            "l": "int"
          },
          {
            "t": "Fanout pattern (HLD)",
            "l": "int"
          },
          {
            "t": "Realtime updates pattern",
            "l": "int"
          }
        ]
      },
      {
        "id": "p6-standard-solutions-to-data-problems",
        "tag": "Data Patterns",
        "tagColor": "#993556",
        "title": "Standard solutions to data problems",
        "source": [
          "SDI §6"
        ],
        "dep": "Scaling patterns",
        "topics": [
          {
            "t": "Handling large files",
            "l": "int"
          },
          {
            "t": "Media streaming",
            "l": "adv"
          },
          {
            "t": "Handling location data",
            "l": "int"
          },
          {
            "t": "Generating unique IDs",
            "l": "int"
          },
          {
            "t": "Distributed counting",
            "l": "adv"
          },
          {
            "t": "Deduplicating data",
            "l": "int"
          },
          {
            "t": "Failure detection",
            "l": "int"
          },
          {
            "t": "Multi-region architecture",
            "l": "adv"
          },
          {
            "t": "Multi-tenancy",
            "l": "adv"
          },
          {
            "t": "Recommendations (ML-light)",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p6-how-to-perform-not-just-know",
        "tag": "Interview Tips",
        "tagColor": "#888780",
        "title": "How to perform, not just know",
        "source": [
          "SDI §7",
          "LLD §9"
        ],
        "dep": null,
        "topics": [
          {
            "t": "Answering framework (RESHADED / RADIO)",
            "l": "beg"
          },
          {
            "t": "Estimation cheatsheet",
            "l": "beg"
          },
          {
            "t": "Diagramming tips",
            "l": "beg"
          },
          {
            "t": "Choosing the right database",
            "l": "int"
          },
          {
            "t": "How to approach OOD interviews",
            "l": "beg"
          },
          {
            "t": "How to approach machine coding interviews",
            "l": "beg"
          },
          {
            "t": "How to identify entities & model relationships",
            "l": "int"
          },
          {
            "t": "How to choose design patterns",
            "l": "int"
          },
          {
            "t": "How to handle concurrency scenarios",
            "l": "int"
          }
        ]
      }
    ]
  },
  {
    "id": "p7",
    "label": "Phase 7",
    "title": "HLD problems — full system design practice",
    "meta": "Ongoing from Phase 5 · Volume + repetition",
    "color": "#444441",
    "why": "Problems are grouped by the dominant challenge they test. Attempt them in this order — each group introduces a new dominant concern (basic CRUD → real-time → fan-out → location → consistency) so your skill builds progressively rather than randomly.",
    "modules": [
      {
        "id": "p7-basic-request-response-systems",
        "tag": "Beginner HLD Problems",
        "tagColor": "#639922",
        "title": "Basic request-response systems",
        "source": [
          "SDI §9"
        ],
        "dep": "HLD core concepts",
        "topics": [
          {
            "t": "URL shortener (HLD)",
            "l": "beg"
          },
          {
            "t": "Pastebin",
            "l": "beg"
          },
          {
            "t": "Search autocomplete",
            "l": "beg"
          }
        ]
      },
      {
        "id": "p7-websocket-messaging-systems",
        "tag": "Real-Time Communication",
        "tagColor": "#378ADD",
        "title": "WebSocket & messaging systems",
        "source": [
          "SDI §10"
        ],
        "dep": "Communication patterns + Distributed systems",
        "topics": [
          {
            "t": "WhatsApp",
            "l": "int"
          },
          {
            "t": "Slack",
            "l": "int"
          },
          {
            "t": "Live comments",
            "l": "int"
          },
          {
            "t": "Google Docs",
            "l": "adv"
          },
          {
            "t": "Zoom",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p7-fanout-graph-and-feed-problems",
        "tag": "Social Media & Feed",
        "tagColor": "#7F77DD",
        "title": "Fanout, graph, and feed problems",
        "source": [
          "SDI §11"
        ],
        "dep": "Fanout pattern + Caching",
        "topics": [
          {
            "t": "Instagram",
            "l": "int"
          },
          {
            "t": "Facebook news feed",
            "l": "int"
          },
          {
            "t": "TikTok",
            "l": "int"
          },
          {
            "t": "Reddit",
            "l": "int"
          },
          {
            "t": "Tinder",
            "l": "int"
          }
        ]
      },
      {
        "id": "p7-file-video-and-streaming-systems",
        "tag": "Media & Storage",
        "tagColor": "#0F6E56",
        "title": "File, video, and streaming systems",
        "source": [
          "SDI §12"
        ],
        "dep": "Storage systems + CDN + Media streaming pattern",
        "topics": [
          {
            "t": "YouTube",
            "l": "int"
          },
          {
            "t": "Netflix",
            "l": "int"
          },
          {
            "t": "Spotify",
            "l": "int"
          },
          {
            "t": "Google Drive",
            "l": "int"
          },
          {
            "t": "Gmail",
            "l": "adv"
          },
          {
            "t": "Twitch",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p7-geospatial-and-matching-systems",
        "tag": "Location-Based Services",
        "tagColor": "#854F0B",
        "title": "Geospatial and matching systems",
        "source": [
          "SDI §13"
        ],
        "dep": "Geohash / Quad trees + Location data pattern",
        "topics": [
          {
            "t": "Airbnb",
            "l": "int"
          },
          {
            "t": "Food delivery service",
            "l": "int"
          },
          {
            "t": "Uber",
            "l": "adv"
          },
          {
            "t": "Google Maps",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p7-indexing-and-ranking-systems",
        "tag": "Search & Aggregation",
        "tagColor": "#D85A30",
        "title": "Indexing and ranking systems",
        "source": [
          "SDI §14"
        ],
        "dep": "Elasticsearch + Distributed counting",
        "topics": [
          {
            "t": "News aggregator",
            "l": "int"
          },
          {
            "t": "Web crawler",
            "l": "int"
          },
          {
            "t": "Google Search",
            "l": "adv"
          },
          {
            "t": "Ad click aggregator",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p7-high-contention-transaction-systems",
        "tag": "E-Commerce & Booking",
        "tagColor": "#993556",
        "title": "High-contention transaction systems",
        "source": [
          "SDI §15"
        ],
        "dep": "Distributed transactions + Optimistic locking",
        "topics": [
          {
            "t": "Amazon",
            "l": "int"
          },
          {
            "t": "Shopify",
            "l": "int"
          },
          {
            "t": "Flash sale",
            "l": "adv"
          },
          {
            "t": "Online auction",
            "l": "adv"
          },
          {
            "t": "Movie booking system",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p7-strong-consistency-audit-trail",
        "tag": "Payment & Financial",
        "tagColor": "#854F0B",
        "title": "Strong consistency + audit trail",
        "source": [
          "SDI §16"
        ],
        "dep": "Distributed transactions + Idempotency",
        "topics": [
          {
            "t": "Payment system",
            "l": "int"
          },
          {
            "t": "Digital wallet",
            "l": "adv"
          },
          {
            "t": "Stock exchange",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p7-build-the-components-themselves",
        "tag": "Distributed Infrastructure",
        "tagColor": "#3C3489",
        "title": "Build the components themselves",
        "source": [
          "SDI §17"
        ],
        "dep": "All of Phase 5",
        "topics": [
          {
            "t": "Load balancer",
            "l": "int"
          },
          {
            "t": "API gateway",
            "l": "int"
          },
          {
            "t": "Rate limiter (HLD)",
            "l": "int"
          },
          {
            "t": "Key-value store",
            "l": "adv"
          },
          {
            "t": "Distributed cache",
            "l": "adv"
          },
          {
            "t": "CDN",
            "l": "adv"
          },
          {
            "t": "Object storage like S3",
            "l": "adv"
          },
          {
            "t": "Messaging queue",
            "l": "adv"
          },
          {
            "t": "Time series database",
            "l": "adv"
          },
          {
            "t": "Locking service",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p7-approximate-and-exact-counting-at-scale",
        "tag": "Counting & Ranking",
        "tagColor": "#3C3489",
        "title": "Approximate and exact counting at scale",
        "source": [
          "SDI §18"
        ],
        "dep": "HyperLogLog + Count-min sketch",
        "topics": [
          {
            "t": "Likes counting system",
            "l": "int"
          },
          {
            "t": "Real-time leaderboard",
            "l": "int"
          },
          {
            "t": "Top-K system",
            "l": "adv"
          }
        ]
      },
      {
        "id": "p7-background-scheduled-and-monitoring-systems",
        "tag": "Async & Infra Systems",
        "tagColor": "#888780",
        "title": "Background, scheduled, and monitoring systems",
        "source": [
          "SDI §19"
        ],
        "dep": "Message queues + Observability",
        "topics": [
          {
            "t": "Notification service (HLD)",
            "l": "int"
          },
          {
            "t": "Job scheduler",
            "l": "int"
          },
          {
            "t": "CI/CD pipeline",
            "l": "int"
          },
          {
            "t": "Monitoring & alerting system",
            "l": "int"
          }
        ]
      }
    ]
  }
]
