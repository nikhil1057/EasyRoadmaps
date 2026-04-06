export type TopicLevel = 'beginner' | 'intermediate' | 'advanced'

export type ResourceType = 'article' | 'video' | 'book' | 'course' | 'doc' | 'repo' | 'practice'

export type Resource = {
  title: string
  url: string
  type?: ResourceType
  note?: string
}

export type Topic = {
  id: string
  name: string
  level: TopicLevel
  resources?: Resource[]
  comingSoon?: boolean
}

export type Module = {
  id: string
  tag: string
  color: string
  title: string
  sources: string[]
  dependency?: string | null
  topics: Topic[]
}

export type PhaseStatus = 'live' | 'preview' | 'planned'

export type Phase = {
  id: string
  label: string
  title: string
  duration: string
  status: PhaseStatus
  modulesCount: number
  summary: string
  highlights: string[]
}

export type PhaseWithModules = Phase & { modules: Module[] }

export const phasesWithModules: PhaseWithModules[] = [
  {
    "id": "p0",
    "label": "Phase 0",
    "title": "Computing foundations",
    "duration": "~1 week",
    "status": "live",
    "modulesCount": 1,
    "summary": "Computing foundations with 17 topics across 1 modules.",
    "highlights": [
      "How data moves across a network"
    ],
    "modules": [
      {
        "id": "m1-how-data-moves-across-a-network",
        "tag": "Networking",
        "color": "#5748b1",
        "title": "How data moves across a network",
        "sources": [
          "Roadmap"
        ],
        "dependency": null,
        "topics": [
          {
            "id": "p0.m1-how-data-moves-across-a-network.osi-model",
            "name": "OSI model",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p0.m1-how-data-moves-across-a-network.ip-address",
            "name": "IP address",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p0.m1-how-data-moves-across-a-network.tcp-vs-udp",
            "name": "TCP vs UDP",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p0.m1-how-data-moves-across-a-network.http-https",
            "name": "HTTP / HTTPS",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p0.m1-how-data-moves-across-a-network.dns-resolution-chain",
            "name": "DNS resolution chain",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p0.m1-how-data-moves-across-a-network.checksums",
            "name": "Checksums",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p0.m1-how-data-moves-across-a-network.proxy-vs-reverse-proxy",
            "name": "Proxy vs reverse proxy",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p0.m1-how-data-moves-across-a-network.http-2-head-of-line-blocking",
            "name": "HTTP/2 & head-of-line blocking",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p0.m1-how-data-moves-across-a-network.processes-vs-threads",
            "name": "Processes vs threads",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p0.m1-how-data-moves-across-a-network.thread-lifecycle-states",
            "name": "Thread lifecycle & states",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p0.m1-how-data-moves-across-a-network.concurrency-vs-parallelism",
            "name": "Concurrency vs parallelism",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p0.m1-how-data-moves-across-a-network.race-conditions",
            "name": "Race conditions",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p0.m1-how-data-moves-across-a-network.context-switching",
            "name": "Context switching",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p0.m1-how-data-moves-across-a-network.sql-vs-nosql",
            "name": "SQL vs NoSQL",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p0.m1-how-data-moves-across-a-network.acid-transactions",
            "name": "ACID transactions",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p0.m1-how-data-moves-across-a-network.indexing-basics",
            "name": "Indexing basics",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p0.m1-how-data-moves-across-a-network.database-types-overview",
            "name": "Database types overview",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "p1",
    "label": "Phase 1",
    "title": "LLD core — OOP, principles, patterns",
    "duration": "~2 weeks",
    "status": "live",
    "modulesCount": 1,
    "summary": "LLD core — OOP, principles, patterns with 56 topics across 1 modules.",
    "highlights": [
      "Object-oriented fundamentals"
    ],
    "modules": [
      {
        "id": "m1-object-oriented-fundamentals",
        "tag": "OOP",
        "color": "#5748b1",
        "title": "Object-oriented fundamentals",
        "sources": [
          "Roadmap"
        ],
        "dependency": null,
        "topics": [
          {
            "id": "p1.m1-object-oriented-fundamentals.classes-objects",
            "name": "Classes & objects",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.encapsulation",
            "name": "Encapsulation",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.abstraction",
            "name": "Abstraction",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.inheritance",
            "name": "Inheritance",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.polymorphism",
            "name": "Polymorphism",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.interfaces",
            "name": "Interfaces",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.enums",
            "name": "Enums",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.association",
            "name": "Association",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.aggregation",
            "name": "Aggregation",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.composition",
            "name": "Composition",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.dependency",
            "name": "Dependency",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.realization",
            "name": "Realization",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.dry",
            "name": "DRY",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.kiss",
            "name": "KISS",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.yagni",
            "name": "YAGNI",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.coupling-cohesion",
            "name": "Coupling & cohesion",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.law-of-demeter",
            "name": "Law of Demeter",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.separation-of-concerns",
            "name": "Separation of concerns",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.srp",
            "name": "SRP",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.ocp",
            "name": "OCP",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.lsp",
            "name": "LSP",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.isp",
            "name": "ISP",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.dip",
            "name": "DIP",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.class-diagram",
            "name": "Class diagram",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.use-case-diagram",
            "name": "Use case diagram",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.sequence-diagram",
            "name": "Sequence diagram",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.activity-diagram",
            "name": "Activity diagram",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.state-machine-diagram",
            "name": "State machine diagram",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.singleton",
            "name": "Singleton",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.builder",
            "name": "Builder",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.factory-method",
            "name": "Factory method",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.abstract-factory",
            "name": "Abstract factory",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.prototype",
            "name": "Prototype",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.adapter",
            "name": "Adapter",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.facade",
            "name": "Facade",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.decorator",
            "name": "Decorator",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.composite",
            "name": "Composite",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.proxy",
            "name": "Proxy",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.bridge",
            "name": "Bridge",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.flyweight",
            "name": "Flyweight",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.strategy",
            "name": "Strategy",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.iterator",
            "name": "Iterator",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.observer",
            "name": "Observer",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.command",
            "name": "Command",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.state",
            "name": "State",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.template-method",
            "name": "Template method",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.chain-of-responsibility",
            "name": "Chain of responsibility",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.mediator",
            "name": "Mediator",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.visitor",
            "name": "Visitor",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.memento",
            "name": "Memento",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.repository-pattern",
            "name": "Repository pattern",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.dependency-injection",
            "name": "Dependency injection",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.mvc-pattern",
            "name": "MVC pattern",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.null-object-pattern",
            "name": "Null object pattern",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.thread-pool-pattern",
            "name": "Thread pool pattern",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p1.m1-object-oriented-fundamentals.producer-consumer-pattern",
            "name": "Producer-consumer pattern",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "p2",
    "label": "Phase 2",
    "title": "Concurrency — making LLD thread-safe",
    "duration": "~1 week",
    "status": "live",
    "modulesCount": 1,
    "summary": "Concurrency — making LLD thread-safe with 25 topics across 1 modules.",
    "highlights": [
      "The building blocks of safe concurrent code"
    ],
    "modules": [
      {
        "id": "m1-the-building-blocks-of-safe-concurrent-code",
        "tag": "Sync Primitives",
        "color": "#5748b1",
        "title": "The building blocks of safe concurrent code",
        "sources": [
          "Roadmap"
        ],
        "dependency": null,
        "topics": [
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.mutex",
            "name": "Mutex",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.semaphores",
            "name": "Semaphores",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.condition-variables",
            "name": "Condition variables",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.read-write-locks",
            "name": "Read-write locks",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.barriers-latches",
            "name": "Barriers & latches",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.coarse-vs-fine-grained-locking",
            "name": "Coarse vs fine-grained locking",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.reentrant-locks",
            "name": "Reentrant locks",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.optimistic-vs-pessimistic-locking",
            "name": "Optimistic vs pessimistic locking",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.try-lock-timed-locking",
            "name": "Try-lock & timed locking",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.two-phase-locking",
            "name": "Two-phase locking",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.deadlock",
            "name": "Deadlock",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.livelock",
            "name": "Livelock",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.starvation",
            "name": "Starvation",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.lost-signal-wakeup",
            "name": "Lost signal / wakeup",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.thread-leakage",
            "name": "Thread leakage",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.priority-inversion",
            "name": "Priority inversion",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.thread-pool-pattern",
            "name": "Thread pool pattern",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.producer-consumer",
            "name": "Producer-consumer",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.signaling-pattern",
            "name": "Signaling pattern",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.reader-writer-pattern",
            "name": "Reader-writer pattern",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.future-promise-pattern",
            "name": "Future / promise pattern",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.fork-join",
            "name": "Fork-join",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.double-checked-locking",
            "name": "Double-checked locking",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.compare-and-swap-cas",
            "name": "Compare-and-swap (CAS)",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p2.m1-the-building-blocks-of-safe-concurrent-code.atomic-operations",
            "name": "Atomic operations",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "p3",
    "label": "Phase 3",
    "title": "LLD problems — applying patterns + concurrency",
    "duration": "~2 weeks",
    "status": "live",
    "modulesCount": 1,
    "summary": "LLD problems — applying patterns + concurrency with 51 topics across 1 modules.",
    "highlights": [
      "Implement foundational structures first"
    ],
    "modules": [
      {
        "id": "m1-implement-foundational-structures-first",
        "tag": "Data Structures & Search",
        "color": "#5748b1",
        "title": "Implement foundational structures first",
        "sources": [
          "Roadmap"
        ],
        "dependency": null,
        "topics": [
          {
            "id": "p3.m1-implement-foundational-structures-first.lru-cache",
            "name": "LRU cache",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.thread-safe-lru-cache",
            "name": "Thread-safe LRU cache",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.bloom-filter",
            "name": "Bloom filter",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.concurrent-bloom-filter",
            "name": "Concurrent bloom filter",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.search-autocomplete-trie",
            "name": "Search autocomplete (Trie)",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.thread-safe-trie",
            "name": "Thread-safe Trie",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.concurrent-hashmap",
            "name": "Concurrent HashMap",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.thread-safe-blocking-queue",
            "name": "Thread-safe blocking queue",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.lock-free-queue",
            "name": "Lock-free queue",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.print-foobar-alternately",
            "name": "Print FooBar alternately",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.print-zero-even-odd",
            "name": "Print zero even odd",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.bounded-buffer",
            "name": "Bounded buffer",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.readers-writers-problem",
            "name": "Readers-writers problem",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.dining-philosophers",
            "name": "Dining philosophers",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.sleeping-barber",
            "name": "Sleeping barber",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.cigarette-smokers",
            "name": "Cigarette smokers",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.santa-claus-problem",
            "name": "Santa Claus problem",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.atm-design",
            "name": "ATM design",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.vending-machine",
            "name": "Vending machine",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.elevator-system",
            "name": "Elevator system",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.traffic-control-system",
            "name": "Traffic control system",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.coffee-vending-machine",
            "name": "Coffee vending machine",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.parking-lot",
            "name": "Parking lot",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.task-management-system",
            "name": "Task management system",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.inventory-management",
            "name": "Inventory management",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.library-management",
            "name": "Library management",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.restaurant-management",
            "name": "Restaurant management",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.url-shortener-lld",
            "name": "URL shortener (LLD)",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.logging-framework",
            "name": "Logging framework",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.rate-limiter-lld",
            "name": "Rate limiter (LLD)",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.thread-safe-rate-limiter",
            "name": "Thread-safe rate limiter",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.in-memory-file-system",
            "name": "In-memory file system",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.version-control-system",
            "name": "Version control system",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.task-scheduler-with-dependencies",
            "name": "Task scheduler with dependencies",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.notification-system",
            "name": "Notification system",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.pub-sub-system-lld",
            "name": "Pub-sub system (LLD)",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.multithreaded-pub-sub",
            "name": "Multithreaded pub-sub",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.chat-application",
            "name": "Chat application",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.splitwise",
            "name": "Splitwise",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.payment-gateway",
            "name": "Payment gateway",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.thread-safe-ticket-booking",
            "name": "Thread-safe ticket booking",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.movie-booking-system",
            "name": "Movie booking system",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.online-stock-exchange",
            "name": "Online stock exchange",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.online-auction",
            "name": "Online auction",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.ride-hailing-service-lld",
            "name": "Ride hailing service (LLD)",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.social-network",
            "name": "Social network",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.stack-overflow",
            "name": "Stack Overflow",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.learning-platform",
            "name": "Learning platform",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.linkedin",
            "name": "LinkedIn",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.spotify",
            "name": "Spotify",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p3.m1-implement-foundational-structures-first.cricinfo",
            "name": "Cricinfo",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "p4",
    "label": "Phase 4",
    "title": "HLD core concepts — scalability & data",
    "duration": "~2 weeks",
    "status": "live",
    "modulesCount": 1,
    "summary": "HLD core concepts — scalability & data with 71 topics across 1 modules.",
    "highlights": [
      "The vocabulary of every HLD conversation"
    ],
    "modules": [
      {
        "id": "m1-the-vocabulary-of-every-hld-conversation",
        "tag": "Core Concepts",
        "color": "#5748b1",
        "title": "The vocabulary of every HLD conversation",
        "sources": [
          "Roadmap"
        ],
        "dependency": null,
        "topics": [
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.scalability-vertical-vs-horizontal",
            "name": "Scalability (vertical vs horizontal)",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.availability",
            "name": "Availability",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.reliability",
            "name": "Reliability",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.latency-vs-throughput-vs-bandwidth",
            "name": "Latency vs throughput vs bandwidth",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.single-point-of-failure",
            "name": "Single point of failure",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.cap-theorem",
            "name": "CAP theorem",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.consistency-models",
            "name": "Consistency models",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.strong-vs-eventual-consistency",
            "name": "Strong vs eventual consistency",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.consistent-hashing",
            "name": "Consistent hashing",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.load-balancer-basics",
            "name": "Load balancer basics",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.load-balancing-algorithms",
            "name": "Load balancing algorithms",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.dns-load-balancing",
            "name": "DNS load balancing",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.anycast-routing",
            "name": "Anycast routing",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.nginx-as-load-balancer",
            "name": "Nginx as load balancer",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.rest-api-design",
            "name": "REST API design",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.grpc-deep-dive",
            "name": "gRPC deep dive",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.graphql",
            "name": "GraphQL",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.idempotency",
            "name": "Idempotency",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.api-gateway-pattern",
            "name": "API gateway pattern",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.rate-limiting-hld",
            "name": "Rate limiting (HLD)",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.auth-session-vs-token",
            "name": "Auth: session vs token",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.jwt",
            "name": "JWT",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.oauth2-sso",
            "name": "OAuth2 / SSO",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.sync-vs-async-communication",
            "name": "Sync vs async communication",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.long-polling",
            "name": "Long polling",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.websockets",
            "name": "WebSockets",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.server-sent-events",
            "name": "Server-sent events",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.webhooks",
            "name": "Webhooks",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.message-queues-hld",
            "name": "Message queues (HLD)",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.pub-sub-hld",
            "name": "Pub/sub (HLD)",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.dead-letter-queues",
            "name": "Dead letter queues",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.delivery-semantics-at-least-at-most-exactly-once",
            "name": "Delivery semantics (at-least/at-most/exactly-once)",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.change-data-capture-cdc",
            "name": "Change data capture (CDC)",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.webrtc",
            "name": "WebRTC",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.cache-aside-pattern",
            "name": "Cache-aside pattern",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.read-through-write-through",
            "name": "Read-through / write-through",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.write-behind-cache",
            "name": "Write-behind cache",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.cache-eviction-policies",
            "name": "Cache eviction policies",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.cdn",
            "name": "CDN",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.distributed-cache-architecture",
            "name": "Distributed cache architecture",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.cache-invalidation",
            "name": "Cache invalidation",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.cache-stampede",
            "name": "Cache stampede",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.cache-warming",
            "name": "Cache warming",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.redis-deep-dive",
            "name": "Redis deep dive",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.memcached",
            "name": "Memcached",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.relational-databases-postgresql",
            "name": "Relational databases / PostgreSQL",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.document-databases-mongodb",
            "name": "Document databases / MongoDB",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.key-value-stores-dynamodb",
            "name": "Key-value stores / DynamoDB",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.wide-column-cassandra",
            "name": "Wide-column / Cassandra",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.graph-databases",
            "name": "Graph databases",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.time-series-databases",
            "name": "Time series databases",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.full-text-search-elasticsearch",
            "name": "Full-text search / Elasticsearch",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.vector-databases",
            "name": "Vector databases",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.b-trees-b-trees",
            "name": "B-trees & B+ trees",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.lsm-trees",
            "name": "LSM trees",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.bloom-filters-db-context",
            "name": "Bloom filters (DB context)",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.how-databases-guarantee-durability-wal",
            "name": "How databases guarantee durability (WAL)",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.indexing-deep",
            "name": "Indexing (deep)",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.query-optimization",
            "name": "Query optimization",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.read-replicas",
            "name": "Read replicas",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.denormalization",
            "name": "Denormalization",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.materialized-views",
            "name": "Materialized views",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.connection-pooling",
            "name": "Connection pooling",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.vertical-partitioning",
            "name": "Vertical partitioning",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.sharding",
            "name": "Sharding",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.sharding-vs-partitioning",
            "name": "Sharding vs partitioning",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.mysql-deep-dive",
            "name": "MySQL deep dive",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.block-vs-file-vs-object-storage",
            "name": "Block vs file vs object storage",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.object-storage-s3",
            "name": "Object storage / S3",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.distributed-file-systems",
            "name": "Distributed file systems",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p4.m1-the-vocabulary-of-every-hld-conversation.erasure-coding",
            "name": "Erasure coding",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "p5",
    "label": "Phase 5",
    "title": "HLD architecture patterns + distributed systems",
    "duration": "~2 weeks",
    "status": "live",
    "modulesCount": 1,
    "summary": "HLD architecture patterns + distributed systems with 70 topics across 1 modules.",
    "highlights": [
      "How services are structured"
    ],
    "modules": [
      {
        "id": "m1-how-services-are-structured",
        "tag": "Architectural Patterns",
        "color": "#5748b1",
        "title": "How services are structured",
        "sources": [
          "Roadmap"
        ],
        "dependency": null,
        "topics": [
          {
            "id": "p5.m1-how-services-are-structured.client-server-architecture",
            "name": "Client-server architecture",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.monolithic-architecture",
            "name": "Monolithic architecture",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.microservices-architecture",
            "name": "Microservices architecture",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.serverless-architecture",
            "name": "Serverless architecture",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.event-driven-architecture",
            "name": "Event-driven architecture",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.cqrs",
            "name": "CQRS",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.event-sourcing",
            "name": "Event sourcing",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.peer-to-peer",
            "name": "Peer-to-peer",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.service-discovery",
            "name": "Service discovery",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.api-gateway-pattern",
            "name": "API gateway pattern",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.backend-for-frontend-bff",
            "name": "Backend for frontend (BFF)",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.sidecar-pattern",
            "name": "Sidecar pattern",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.circuit-breaker-pattern",
            "name": "Circuit breaker pattern",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.bulkhead-pattern",
            "name": "Bulkhead pattern",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.strangler-fig-pattern",
            "name": "Strangler fig pattern",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.service-mesh",
            "name": "Service mesh",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.push-vs-pull-architecture",
            "name": "Push vs pull architecture",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.stateful-vs-stateless",
            "name": "Stateful vs stateless",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.long-polling-vs-websockets",
            "name": "Long polling vs WebSockets",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.fanout-on-write-vs-read",
            "name": "Fanout on write vs read",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.batch-vs-stream-processing",
            "name": "Batch vs stream processing",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.challenges-of-distribution",
            "name": "Challenges of distribution",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.network-partitions",
            "name": "Network partitions",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.split-brain-problem",
            "name": "Split brain problem",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.heartbeats",
            "name": "Heartbeats",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.handling-failures",
            "name": "Handling failures",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.clock-synchronization-problem",
            "name": "Clock synchronization problem",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.logical-clocks",
            "name": "Logical clocks",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.lamport-timestamps",
            "name": "Lamport timestamps",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.vector-clocks",
            "name": "Vector clocks",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.consensus-algorithms-overview",
            "name": "Consensus algorithms overview",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.paxos-algorithm",
            "name": "Paxos algorithm",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.raft-algorithm",
            "name": "Raft algorithm",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.leader-election",
            "name": "Leader election",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.gossip-protocol",
            "name": "Gossip protocol",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.zookeeper",
            "name": "Zookeeper",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.docker-kubernetes",
            "name": "Docker & Kubernetes",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.problem-with-distributed-transactions",
            "name": "Problem with distributed transactions",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.two-phase-commit-2pc",
            "name": "Two-phase commit (2PC)",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.three-phase-commit-3pc",
            "name": "Three-phase commit (3PC)",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.saga-pattern",
            "name": "Saga pattern",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.outbox-pattern",
            "name": "Outbox pattern",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.mapreduce",
            "name": "MapReduce",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.etl-pipelines",
            "name": "ETL pipelines",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.data-lakes",
            "name": "Data lakes",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.data-warehousing",
            "name": "Data warehousing",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.lambda-architecture",
            "name": "Lambda architecture",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.kappa-architecture",
            "name": "Kappa architecture",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.kafka-deep-dive",
            "name": "Kafka deep dive",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.flink-spark",
            "name": "Flink / Spark",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.sqs-rabbitmq",
            "name": "SQS / RabbitMQ",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.geohash",
            "name": "Geohash",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.quad-trees",
            "name": "Quad trees",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.r-trees",
            "name": "R-trees",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.skip-lists",
            "name": "Skip lists",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.merkle-trees",
            "name": "Merkle trees",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.hyperloglog",
            "name": "HyperLogLog",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.count-min-sketch",
            "name": "Count-min sketch",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.three-pillars-of-observability",
            "name": "Three pillars of observability",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.logging-best-practices",
            "name": "Logging best practices",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.log-aggregation",
            "name": "Log aggregation",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.correlation-ids",
            "name": "Correlation IDs",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.metrics-instrumentation",
            "name": "Metrics & instrumentation",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.alert-monitoring",
            "name": "Alert & monitoring",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.distributed-tracing",
            "name": "Distributed tracing",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.prometheus",
            "name": "Prometheus",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.ssl-tls-deep-dive",
            "name": "SSL/TLS deep dive",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.rbac",
            "name": "RBAC",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.secrets-management",
            "name": "Secrets management",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p5.m1-how-services-are-structured.saml",
            "name": "SAML",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "p6",
    "label": "Phase 6",
    "title": "Interview patterns — recurring solution templates",
    "duration": "~1 week",
    "status": "live",
    "modulesCount": 1,
    "summary": "Interview patterns — recurring solution templates with 26 topics across 1 modules.",
    "highlights": [
      "Standard solutions to scale problems"
    ],
    "modules": [
      {
        "id": "m1-standard-solutions-to-scale-problems",
        "tag": "Scaling Patterns",
        "color": "#5748b1",
        "title": "Standard solutions to scale problems",
        "sources": [
          "Roadmap"
        ],
        "dependency": null,
        "topics": [
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.high-read-traffic",
            "name": "High read traffic",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.high-write-traffic",
            "name": "High write traffic",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.handling-hot-keys",
            "name": "Handling hot keys",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.handling-traffic-spikes",
            "name": "Handling traffic spikes",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.removing-spofs",
            "name": "Removing SPOFs",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.fanout-pattern-hld",
            "name": "Fanout pattern (HLD)",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.realtime-updates-pattern",
            "name": "Realtime updates pattern",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.handling-large-files",
            "name": "Handling large files",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.media-streaming",
            "name": "Media streaming",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.handling-location-data",
            "name": "Handling location data",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.generating-unique-ids",
            "name": "Generating unique IDs",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.distributed-counting",
            "name": "Distributed counting",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.deduplicating-data",
            "name": "Deduplicating data",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.failure-detection",
            "name": "Failure detection",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.multi-region-architecture",
            "name": "Multi-region architecture",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.multi-tenancy",
            "name": "Multi-tenancy",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.recommendations-ml-light",
            "name": "Recommendations (ML-light)",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.answering-framework-reshaded-radio",
            "name": "Answering framework (RESHADED / RADIO)",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.estimation-cheatsheet",
            "name": "Estimation cheatsheet",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.diagramming-tips",
            "name": "Diagramming tips",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.choosing-the-right-database",
            "name": "Choosing the right database",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.how-to-approach-ood-interviews",
            "name": "How to approach OOD interviews",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.how-to-approach-machine-coding-interviews",
            "name": "How to approach machine coding interviews",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.how-to-identify-entities-model-relationships",
            "name": "How to identify entities & model relationships",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.how-to-choose-design-patterns",
            "name": "How to choose design patterns",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p6.m1-standard-solutions-to-scale-problems.how-to-handle-concurrency-scenarios",
            "name": "How to handle concurrency scenarios",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "p7",
    "label": "Phase 7",
    "title": "HLD problems — full system design practice",
    "duration": "Ongoing",
    "status": "live",
    "modulesCount": 1,
    "summary": "HLD problems — full system design practice with 52 topics across 1 modules.",
    "highlights": [
      "Basic request-response systems"
    ],
    "modules": [
      {
        "id": "m1-basic-request-response-systems",
        "tag": "Beginner HLD Problems",
        "color": "#5748b1",
        "title": "Basic request-response systems",
        "sources": [
          "Roadmap"
        ],
        "dependency": null,
        "topics": [
          {
            "id": "p7.m1-basic-request-response-systems.url-shortener-hld",
            "name": "URL shortener (HLD)",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.pastebin",
            "name": "Pastebin",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.search-autocomplete",
            "name": "Search autocomplete",
            "level": "beginner",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.whatsapp",
            "name": "WhatsApp",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.slack",
            "name": "Slack",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.live-comments",
            "name": "Live comments",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.google-docs",
            "name": "Google Docs",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.zoom",
            "name": "Zoom",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.instagram",
            "name": "Instagram",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.facebook-news-feed",
            "name": "Facebook news feed",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.tiktok",
            "name": "TikTok",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.reddit",
            "name": "Reddit",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.tinder",
            "name": "Tinder",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.youtube",
            "name": "YouTube",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.netflix",
            "name": "Netflix",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.spotify",
            "name": "Spotify",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.google-drive",
            "name": "Google Drive",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.gmail",
            "name": "Gmail",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.twitch",
            "name": "Twitch",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.airbnb",
            "name": "Airbnb",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.food-delivery-service",
            "name": "Food delivery service",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.uber",
            "name": "Uber",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.google-maps",
            "name": "Google Maps",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.news-aggregator",
            "name": "News aggregator",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.web-crawler",
            "name": "Web crawler",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.google-search",
            "name": "Google Search",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.ad-click-aggregator",
            "name": "Ad click aggregator",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.amazon",
            "name": "Amazon",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.shopify",
            "name": "Shopify",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.flash-sale",
            "name": "Flash sale",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.online-auction",
            "name": "Online auction",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.movie-booking-system",
            "name": "Movie booking system",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.payment-system",
            "name": "Payment system",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.digital-wallet",
            "name": "Digital wallet",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.stock-exchange",
            "name": "Stock exchange",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.load-balancer",
            "name": "Load balancer",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.api-gateway",
            "name": "API gateway",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.rate-limiter-hld",
            "name": "Rate limiter (HLD)",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.key-value-store",
            "name": "Key-value store",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.distributed-cache",
            "name": "Distributed cache",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.cdn",
            "name": "CDN",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.object-storage-like-s3",
            "name": "Object storage like S3",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.messaging-queue",
            "name": "Messaging queue",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.time-series-database",
            "name": "Time series database",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.locking-service",
            "name": "Locking service",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.likes-counting-system",
            "name": "Likes counting system",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.real-time-leaderboard",
            "name": "Real-time leaderboard",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.top-k-system",
            "name": "Top-K system",
            "level": "advanced",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.notification-service-hld",
            "name": "Notification service (HLD)",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.job-scheduler",
            "name": "Job scheduler",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.ci-cd-pipeline",
            "name": "CI/CD pipeline",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          },
          {
            "id": "p7.m1-basic-request-response-systems.monitoring-alerting-system",
            "name": "Monitoring & alerting system",
            "level": "intermediate",
            "comingSoon": true,
            "resources": []
          }
        ]
      }
    ]
  }
]

export const phases: Phase[] = phasesWithModules.map(({ modules, ...phase }) => phase)

export function getPhase(phaseId: string) {
  return phasesWithModules.find((p) => p.id === phaseId) ?? null
}

export function getPhaseModules(phaseId: string): Module[] {
  const found = phasesWithModules.find((p) => p.id === phaseId)
  return found ? [...found.modules] : []
}

export function allTopics() {
  return phasesWithModules.flatMap((phase) =>
    phase.modules.flatMap((module) => module.topics.map((topic) => ({ phase, module, topic }))),
  )
}

export function findTopicById(id: string) {
  return allTopics().find((x) => x.topic.id === id) ?? null
}
